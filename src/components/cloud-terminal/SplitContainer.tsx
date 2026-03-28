/**
 * @file SplitContainer.tsx
 * @description Recursive renderer for the split pane tree.
 *
 * Given a SplitNode (binary tree), renders:
 * - Leaf nodes → TerminalTabs + TerminalPane for each tab
 * - Split nodes → two children separated by a SplitHandle
 */

import { useCallback, useMemo } from 'react';
import { cn } from '../lib/cn';
import type { SplitNode, UseSplitPaneReturn } from './useSplitPane';
import { SplitHandle } from './SplitHandle';
import { TerminalTabs } from './TerminalTabs';
import { TerminalPane } from './TerminalPane';
import type { TerminalThemeColors } from './CloudTerminal.types';
import type { ElementAnimation } from './animations';
import { animClasses } from './animations';

export interface SplitContainerProps {
  readonly node: SplitNode;
  readonly split: UseSplitPaneReturn;
  /** xterm theme (passed to every pane) */
  readonly xtermTheme?: Partial<TerminalThemeColors>;
  readonly fontSize?: number;
  readonly fontFamily?: string;
  readonly socketUrl?: string;
  readonly cursorBlink?: boolean;
  readonly showScanlines?: boolean;
  /** Entry animation for new panes */
  readonly paneAnimation?: ElementAnimation;
  readonly className?: string;
}

let _dragSource: { groupId: string; tabId: string } | null = null;

interface SharedPaneProps {
  readonly split: UseSplitPaneReturn;
  readonly xtermTheme?: Partial<TerminalThemeColors>;
  readonly fontSize?: number;
  readonly fontFamily?: string;
  readonly socketUrl?: string;
  readonly cursorBlink?: boolean;
  readonly showScanlines?: boolean;
  readonly paneAnimation?: ElementAnimation;
}

function SplitBranch({
  node,
  split,
  xtermTheme,
  fontSize,
  fontFamily,
  socketUrl,
  cursorBlink,
  showScanlines,
  paneAnimation,
  className = '',
}: SharedPaneProps & {
  readonly node: Extract<SplitNode, { type: 'split' }>;
  readonly className?: string;
}) {
  const { direction, ratio, children } = node;

  const firstGroupId = useMemo(() => {
    const collect = (n: SplitNode): string | undefined => {
      if (n.type === 'leaf') return n.group.id;
      return collect(n.children[0]);
    };
    return collect(children[0]);
  }, [children]);

  const onResize = useCallback(
    (newRatio: number) => {
      if (firstGroupId) split.setRatio(firstGroupId, newRatio);
    },
    [split, firstGroupId],
  );

  const isH = direction === 'horizontal';
  const style = isH
    ? { gridTemplateColumns: `${ratio * 100}% 4px ${(1 - ratio) * 100 - 0.3}%` }
    : { gridTemplateRows: `${ratio * 100}% 4px ${(1 - ratio) * 100 - 0.3}%` };

  return (
    <div
      className={cn('ct-split-branch', `ct-split-branch--${direction}`, className)}
      style={style}
    >
      <SplitContainer
        node={children[0]}
        split={split}
        xtermTheme={xtermTheme}
        fontSize={fontSize}
        fontFamily={fontFamily}
        socketUrl={socketUrl}
        cursorBlink={cursorBlink}
        showScanlines={showScanlines}
        paneAnimation={paneAnimation}
      />
      <SplitHandle direction={direction} onResize={onResize} />
      <SplitContainer
        node={children[1]}
        split={split}
        xtermTheme={xtermTheme}
        fontSize={fontSize}
        fontFamily={fontFamily}
        socketUrl={socketUrl}
        cursorBlink={cursorBlink}
        showScanlines={showScanlines}
        paneAnimation={paneAnimation}
      />
    </div>
  );
}

function SplitLeaf({
  node,
  split,
  xtermTheme,
  fontSize,
  fontFamily,
  socketUrl,
  cursorBlink,
  showScanlines,
  paneAnimation,
  className = '',
}: SharedPaneProps & {
  readonly node: Extract<SplitNode, { type: 'leaf' }>;
  readonly className?: string;
}) {
  const { group } = node;
  const isFocused = split.state.focusedGroupId === group.id;

  return (
    <div
      className={cn(
        'ct-split-leaf',
        isFocused && 'ct-split-leaf--focused',
        paneAnimation ? animClasses(paneAnimation) : '',
        className,
      )}
    >
      <TerminalTabs
        groupId={group.id}
        tabs={group.tabs}
        activeTabId={group.activeTabId}
        focused={isFocused}
        onSelectTab={(tabId) => split.setActiveTab(group.id, tabId)}
        onCloseTab={(tabId) => split.closeTab(group.id, tabId)}
        onAddTab={() => split.addTab(group.id)}
        onSplit={(dir) => split.splitPane(group.id, dir)}
        onDragStart={(gId, tId) => {
          _dragSource = { groupId: gId, tabId: tId };
        }}
        onDrop={(targetGroupId) => {
          if (_dragSource) {
            split.moveTab(_dragSource.groupId, _dragSource.tabId, targetGroupId);
            _dragSource = null;
          }
        }}
        onDropEdge={(targetGroupId, direction) => {
          if (_dragSource) {
            split.moveTabToNewSplit(
              _dragSource.groupId,
              _dragSource.tabId,
              targetGroupId,
              direction,
            );
            _dragSource = null;
          }
        }}
      />

      <div className="ct-split-leaf__panes">
        {group.tabs.map((tab) => (
          <TerminalPane
            key={tab.id}
            tabId={tab.id}
            visible={tab.id === group.activeTabId}
            focused={isFocused && tab.id === group.activeTabId}
            socketUrl={socketUrl}
            fontSize={fontSize}
            fontFamily={fontFamily}
            theme={xtermTheme}
            cursorBlink={cursorBlink}
            showScanlines={showScanlines}
            onFocus={() => split.setFocusedGroup(group.id)}
            onSessionEnd={() => split.closeTab(group.id, tab.id)}
            onTtyInfo={(ttyName) => {
              // Extract just the pts number, e.g. "/dev/pts/3" → "pts/3"
              const short = ttyName.replace(/^\/dev\//, '');
              split.renameTab(group.id, tab.id, short);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function SplitContainer({
  node,
  split,
  xtermTheme,
  fontSize,
  fontFamily,
  socketUrl,
  cursorBlink,
  showScanlines = true,
  paneAnimation,
  className = '',
}: Readonly<SplitContainerProps>) {
  if (node.type === 'leaf') {
    return (
      <SplitLeaf
        node={node}
        split={split}
        xtermTheme={xtermTheme}
        fontSize={fontSize}
        fontFamily={fontFamily}
        socketUrl={socketUrl}
        cursorBlink={cursorBlink}
        showScanlines={showScanlines}
        paneAnimation={paneAnimation}
        className={className}
      />
    );
  }

  return (
    <SplitBranch
      node={node}
      split={split}
      xtermTheme={xtermTheme}
      fontSize={fontSize}
      fontFamily={fontFamily}
      socketUrl={socketUrl}
      cursorBlink={cursorBlink}
      showScanlines={showScanlines}
      paneAnimation={paneAnimation}
      className={className}
    />
  );
}
