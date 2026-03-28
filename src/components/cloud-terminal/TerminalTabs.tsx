/**
 * @file TerminalTabs.tsx
 * @description Tab bar for terminal pane groups with drag-and-drop support.
 *
 * Features:
 * - Click to switch active tab
 * - Drag a tab to reorder or move to another group
 * - "+" button to add a new terminal tab
 * - "×" button to close a tab
 * - Split buttons (horizontal/vertical)
 * - Drop zones on edges for split-to-new-pane
 */

import { useState, useCallback, useRef } from 'react';
import { cn } from '../lib/cn';
import type { TerminalTab, SplitDirection } from './useSplitPane';

export interface TerminalTabsProps {
  readonly groupId: string;
  readonly tabs: readonly TerminalTab[];
  readonly activeTabId: string;
  readonly focused: boolean;
  readonly onSelectTab: (tabId: string) => void;
  readonly onCloseTab: (tabId: string) => void;
  readonly onAddTab: () => void;
  readonly onSplit: (direction: SplitDirection) => void;
  readonly onDragStart?: (groupId: string, tabId: string) => void;
  readonly onDrop?: (targetGroupId: string) => void;
  readonly onDropEdge?: (targetGroupId: string, direction: SplitDirection) => void;
  readonly className?: string;
}

export function TerminalTabs({
  groupId,
  tabs,
  activeTabId,
  focused,
  onSelectTab,
  onCloseTab,
  onAddTab,
  onSplit,
  onDragStart,
  onDrop,
  onDropEdge,
  className = '',
}: Readonly<TerminalTabsProps>) {
  const [dragOver, setDragOver] = useState(false);
  const [dropEdge, setDropEdge] = useState<SplitDirection | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = useCallback(
    (tabId: string) => (e: React.DragEvent) => {
      e.dataTransfer.setData('text/plain', JSON.stringify({ groupId, tabId }));
      e.dataTransfer.effectAllowed = 'move';
      onDragStart?.(groupId, tabId);
    },
    [groupId, onDragStart],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(true);

    // Detect edge zones for split drops
    const el = dropRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const edgeThreshold = 30;

    if (x < edgeThreshold) setDropEdge('horizontal');
    else if (x > rect.width - edgeThreshold) setDropEdge('horizontal');
    else if (y < edgeThreshold) setDropEdge('vertical');
    else if (y > rect.height - edgeThreshold) setDropEdge('vertical');
    else setDropEdge(null);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
    setDropEdge(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      setDropEdge(null);

      if (dropEdge) {
        onDropEdge?.(groupId, dropEdge);
      } else {
        onDrop?.(groupId);
      }
    },
    [groupId, dropEdge, onDrop, onDropEdge],
  );

  return (
    <div
      ref={dropRef}
      className={cn(
        'ct-tabs',
        focused && 'ct-tabs--focused',
        dragOver && 'ct-tabs--drag-over',
        dropEdge && `ct-tabs--drop-${dropEdge}`,
        className,
      )}
      role="toolbar"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="ct-tabs__list" role="tablist">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn('ct-tabs__tab', tab.id === activeTabId && 'ct-tabs__tab--active')}
            role="tab"
            tabIndex={tab.id === activeTabId ? 0 : -1}
            aria-selected={tab.id === activeTabId}
            draggable
            onDragStart={handleDragStart(tab.id)}
            onClick={() => onSelectTab(tab.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectTab(tab.id);
            }}
          >
            <span className="ct-tabs__tab-icon">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </span>
            <span className="ct-tabs__tab-label">{tab.label}</span>
            {tabs.length > 1 && (
              <button
                type="button"
                className="ct-tabs__tab-close"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                aria-label={`Close ${tab.label}`}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="ct-tabs__actions">
        {/* Add terminal */}
        <button
          type="button"
          className="ct-tabs__btn"
          onClick={onAddTab}
          title="New Terminal"
          aria-label="New terminal"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        {/* Split horizontal */}
        <button
          type="button"
          className="ct-tabs__btn"
          onClick={() => onSplit('horizontal')}
          title="Split Right"
          aria-label="Split right"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="12" y1="3" x2="12" y2="21" />
          </svg>
        </button>
        {/* Split vertical */}
        <button
          type="button"
          className="ct-tabs__btn"
          onClick={() => onSplit('vertical')}
          title="Split Down"
          aria-label="Split down"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="12" x2="21" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
