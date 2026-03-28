/**
 * @file useSplitPane.ts
 * @description Split pane state management for terminal layouts.
 *
 * Models a binary tree of panes, each leaf containing a terminal group
 * with tabs. Branch nodes define split direction and ratio.
 *
 * Supports: horizontal/vertical splitting, ratio resizing, pane closing,
 * tab creation/removal/reorder, drag-and-drop between groups.
 */

import { useState, useCallback, useRef } from 'react';

/* ─── Types ─────────────────────────────────────────── */

export type SplitDirection = 'horizontal' | 'vertical';

export interface TerminalTab {
  readonly id: string;
  readonly label: string;
}

export interface PaneGroup {
  readonly id: string;
  readonly tabs: readonly TerminalTab[];
  readonly activeTabId: string;
}

export type SplitNode =
  | { readonly type: 'leaf'; readonly group: PaneGroup }
  | {
      readonly type: 'split';
      readonly direction: SplitDirection;
      readonly ratio: number;
      readonly children: readonly [SplitNode, SplitNode];
    };

export interface SplitPaneState {
  /** The split tree root */
  readonly root: SplitNode;
  /** Currently focused pane group ID */
  readonly focusedGroupId: string;
}

/* ─── Helpers ───────────────────────────────────────── */

let _counter = 0;
function uid(prefix = 'pane'): string {
  return `${prefix}-${++_counter}-${Date.now().toString(36)}`;
}

function createTab(label?: string): TerminalTab {
  const id = uid('tab');
  return { id, label: label ?? `Terminal ${_counter}` };
}

function createGroup(tab?: TerminalTab): PaneGroup {
  const t = tab ?? createTab();
  return { id: uid('group'), tabs: [t], activeTabId: t.id };
}

function createLeaf(group?: PaneGroup): SplitNode {
  return { type: 'leaf', group: group ?? createGroup() };
}

/* ── Tree traversal / mutation (immutable) ──────────── */

/** Find a leaf by group ID and return its path */
function findLeaf(
  node: SplitNode,
  groupId: string,
): SplitNode | null {
  if (node.type === 'leaf') {
    return node.group.id === groupId ? node : null;
  }
  return findLeaf(node.children[0], groupId) ?? findLeaf(node.children[1], groupId);
}

/** Replace a leaf by group ID with a new node */
function replaceNode(
  root: SplitNode,
  groupId: string,
  replacement: SplitNode,
): SplitNode {
  if (root.type === 'leaf') {
    return root.group.id === groupId ? replacement : root;
  }
  return {
    ...root,
    children: [
      replaceNode(root.children[0], groupId, replacement),
      replaceNode(root.children[1], groupId, replacement),
    ],
  };
}

/** Remove a leaf by group ID, returning its sibling (simplifies tree) */
function removeLeaf(root: SplitNode, groupId: string): SplitNode | null {
  if (root.type === 'leaf') {
    return root.group.id === groupId ? null : root;
  }
  const [left, right] = root.children;

  if (left.type === 'leaf' && left.group.id === groupId) return right;
  if (right.type === 'leaf' && right.group.id === groupId) return left;

  const newLeft = removeLeaf(left, groupId);
  if (newLeft === null) return right;
  if (newLeft !== left) return { ...root, children: [newLeft, right] };

  const newRight = removeLeaf(right, groupId);
  if (newRight === null) return left;
  if (newRight !== right) return { ...root, children: [left, newRight] };

  return root;
}

/** Update a leaf's group by ID */
function updateGroup(
  root: SplitNode,
  groupId: string,
  updater: (g: PaneGroup) => PaneGroup,
): SplitNode {
  if (root.type === 'leaf') {
    return root.group.id === groupId
      ? { ...root, group: updater(root.group) }
      : root;
  }
  return {
    ...root,
    children: [
      updateGroup(root.children[0], groupId, updater),
      updateGroup(root.children[1], groupId, updater),
    ],
  };
}

/** Collect all group IDs from the tree */
function allGroupIds(node: SplitNode): string[] {
  if (node.type === 'leaf') return [node.group.id];
  return [...allGroupIds(node.children[0]), ...allGroupIds(node.children[1])];
}

/** Collect all tab IDs */
function allTabIds(node: SplitNode): string[] {
  if (node.type === 'leaf') return node.group.tabs.map((t) => t.id);
  return [...allTabIds(node.children[0]), ...allTabIds(node.children[1])];
}

/** Update ratio on a split node identified by first child's group */
function updateRatio(root: SplitNode, splitNodeFirstGroupId: string, newRatio: number): SplitNode {
  if (root.type === 'leaf') return root;
  const firstGroups = allGroupIds(root.children[0]);
  if (firstGroups.includes(splitNodeFirstGroupId)) {
    return { ...root, ratio: Math.max(0.1, Math.min(0.9, newRatio)) };
  }
  return {
    ...root,
    children: [
      updateRatio(root.children[0], splitNodeFirstGroupId, newRatio),
      updateRatio(root.children[1], splitNodeFirstGroupId, newRatio),
    ],
  };
}

/* ─── Hook ──────────────────────────────────────────── */

export interface UseSplitPaneReturn {
  /** Current state */
  readonly state: SplitPaneState;

  /** Split a pane in a given direction */
  readonly splitPane: (groupId: string, direction: SplitDirection) => void;

  /** Close a pane (remove from tree) */
  readonly closePane: (groupId: string) => void;

  /** Add a new tab to a group */
  readonly addTab: (groupId: string, label?: string) => void;

  /** Close a tab. If last tab in group, closes the group. */
  readonly closeTab: (groupId: string, tabId: string) => void;

  /** Set active tab in a group */
  readonly setActiveTab: (groupId: string, tabId: string) => void;

  /** Rename a tab */
  readonly renameTab: (groupId: string, tabId: string, newLabel: string) => void;

  /** Set focused group */
  readonly setFocusedGroup: (groupId: string) => void;

  /** Resize a split (update ratio) */
  readonly setRatio: (firstChildGroupId: string, ratio: number) => void;

  /** Move a tab from one group to another (drag & drop) */
  readonly moveTab: (fromGroupId: string, tabId: string, toGroupId: string) => void;

  /** Move a tab to a new split (drop on edge zone) */
  readonly moveTabToNewSplit: (fromGroupId: string, tabId: string, targetGroupId: string, direction: SplitDirection) => void;

  /** Get all group IDs in the tree */
  readonly groupIds: string[];

  /** Get all tab IDs in the tree */
  readonly tabIds: string[];
}

export function useSplitPane(): UseSplitPaneReturn {
  const initialLeaf = useRef(createLeaf());
  const [state, setState] = useState<SplitPaneState>(() => ({
    root: initialLeaf.current,
    focusedGroupId: (initialLeaf.current as { type: 'leaf'; group: PaneGroup }).group.id,
  }));

  const splitPane = useCallback((groupId: string, direction: SplitDirection) => {
    setState((prev) => {
      const existing = findLeaf(prev.root, groupId);
      if (existing?.type !== 'leaf') return prev;

      const newGroup = createGroup();
      const splitNode: SplitNode = {
        type: 'split',
        direction,
        ratio: 0.5,
        children: [existing, { type: 'leaf', group: newGroup }],
      };

      return {
        root: replaceNode(prev.root, groupId, splitNode),
        focusedGroupId: newGroup.id,
      };
    });
  }, []);

  const closePane = useCallback((groupId: string) => {
    setState((prev) => {
      const result = removeLeaf(prev.root, groupId);
      if (!result) return prev; // Can't remove last pane
      const groups = allGroupIds(result);
      return {
        root: result,
        focusedGroupId: groups.includes(prev.focusedGroupId)
          ? prev.focusedGroupId
          : groups[0],
      };
    });
  }, []);

  const addTab = useCallback((groupId: string, label?: string) => {
    setState((prev) => {
      const tab = createTab(label);
      return {
        ...prev,
        root: updateGroup(prev.root, groupId, (g) => ({
          ...g,
          tabs: [...g.tabs, tab],
          activeTabId: tab.id,
        })),
        focusedGroupId: groupId,
      };
    });
  }, []);

  const closeTab = useCallback((groupId: string, tabId: string) => {
    setState((prev) => {
      const leaf = findLeaf(prev.root, groupId);
      if (leaf?.type !== 'leaf') return prev;
      const remaining = leaf.group.tabs.filter((t) => t.id !== tabId);

      if (remaining.length === 0) {
        // Close the group entirely
        const result = removeLeaf(prev.root, groupId);
        if (!result) return prev; // Last pane
        const groups = allGroupIds(result);
        return {
          root: result,
          focusedGroupId: groups.includes(prev.focusedGroupId) ? prev.focusedGroupId : groups[0],
        };
      }

      const newActive = leaf.group.activeTabId === tabId
        ? remaining.at(-1)?.id ?? remaining[0].id
        : leaf.group.activeTabId;

      return {
        ...prev,
        root: updateGroup(prev.root, groupId, () => ({
          ...leaf.group,
          tabs: remaining,
          activeTabId: newActive,
        })),
      };
    });
  }, []);

  const setActiveTab = useCallback((groupId: string, tabId: string) => {
    setState((prev) => ({
      ...prev,
      root: updateGroup(prev.root, groupId, (g) => ({ ...g, activeTabId: tabId })),
      focusedGroupId: groupId,
    }));
  }, []);

  const renameTab = useCallback((groupId: string, tabId: string, newLabel: string) => {
    setState((prev) => ({
      ...prev,
      root: updateGroup(prev.root, groupId, (g) => ({
        ...g,
        tabs: g.tabs.map((t) => t.id === tabId ? { ...t, label: newLabel } : t),
      })),
    }));
  }, []);

  const setFocusedGroup = useCallback((groupId: string) => {
    setState((prev) => prev.focusedGroupId === groupId ? prev : { ...prev, focusedGroupId: groupId });
  }, []);

  const setRatio = useCallback((firstChildGroupId: string, ratio: number) => {
    setState((prev) => ({
      ...prev,
      root: updateRatio(prev.root, firstChildGroupId, ratio),
    }));
  }, []);

  const moveTab = useCallback((fromGroupId: string, tabId: string, toGroupId: string) => {
    if (fromGroupId === toGroupId) return;
    setState((prev) => {
      const fromLeaf = findLeaf(prev.root, fromGroupId);
      const toLeaf = findLeaf(prev.root, toGroupId);
      if (fromLeaf?.type !== 'leaf' || toLeaf?.type !== 'leaf') return prev;

      const tab = fromLeaf.group.tabs.find((t) => t.id === tabId);
      if (!tab) return prev;

      let newRoot = prev.root;

      // Remove tab from source
      const remainingFrom = fromLeaf.group.tabs.filter((t) => t.id !== tabId);
      if (remainingFrom.length === 0) {
        const removed = removeLeaf(newRoot, fromGroupId);
        if (!removed) return prev;
        newRoot = removed;
      } else {
        const newActive = fromLeaf.group.activeTabId === tabId
          ? remainingFrom.at(-1)?.id ?? remainingFrom[0].id
          : fromLeaf.group.activeTabId;
        newRoot = updateGroup(newRoot, fromGroupId, () => ({
          ...fromLeaf.group,
          tabs: remainingFrom,
          activeTabId: newActive,
        }));
      }

      // Add tab to target
      newRoot = updateGroup(newRoot, toGroupId, (g) => ({
        ...g,
        tabs: [...g.tabs, tab],
        activeTabId: tab.id,
      }));

      return { root: newRoot, focusedGroupId: toGroupId };
    });
  }, []);

  const moveTabToNewSplit = useCallback((fromGroupId: string, tabId: string, targetGroupId: string, direction: SplitDirection) => {
    setState((prev) => {
      const fromLeaf = findLeaf(prev.root, fromGroupId);
      if (fromLeaf?.type !== 'leaf') return prev;

      const tab = fromLeaf.group.tabs.find((t) => t.id === tabId);
      if (!tab) return prev;

      // Create new group with this tab
      const newGroup = createGroup(tab);
      const newLeaf: SplitNode = { type: 'leaf', group: newGroup };

      let newRoot = prev.root;

      // Remove tab from source
      if (fromGroupId !== targetGroupId || fromLeaf.group.tabs.length > 1) {
        const remainingFrom = fromLeaf.group.tabs.filter((t) => t.id !== tabId);
        if (remainingFrom.length === 0 && fromGroupId !== targetGroupId) {
          const removed = removeLeaf(newRoot, fromGroupId);
          if (removed) newRoot = removed;
        } else if (remainingFrom.length > 0) {
          const newActive = fromLeaf.group.activeTabId === tabId
            ? remainingFrom.at(-1)?.id ?? remainingFrom[0].id
            : fromLeaf.group.activeTabId;
          newRoot = updateGroup(newRoot, fromGroupId, () => ({
            ...fromLeaf.group,
            tabs: remainingFrom,
            activeTabId: newActive,
          }));
        }
      }

      // Split the target with the new pane
      const targetLeaf = findLeaf(newRoot, targetGroupId);
      if (targetLeaf?.type !== 'leaf') return prev;

      const isAfter = direction === 'horizontal' || direction === 'vertical';
      const splitNode: SplitNode = {
        type: 'split',
        direction,
        ratio: 0.5,
        children: isAfter ? [targetLeaf, newLeaf] : [newLeaf, targetLeaf],
      };

      newRoot = replaceNode(newRoot, targetGroupId, splitNode);

      return { root: newRoot, focusedGroupId: newGroup.id };
    });
  }, []);

  return {
    state,
    splitPane,
    closePane,
    addTab,
    closeTab,
    setActiveTab,
    renameTab,
    setFocusedGroup,
    setRatio,
    moveTab,
    moveTabToNewSplit,
    groupIds: allGroupIds(state.root),
    tabIds: allTabIds(state.root),
  };
}
