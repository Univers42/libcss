/**
 * @file WindowPanel
 * @description A Notion-like floating panel/window container.
 * Supports tabbed views so different canvases can live in
 * one window (e.g., 6 color-picker views).
 */

import { useState, useCallback } from 'react';
import type { WindowPanelProps } from '../model/WindowPanel.types';

export function WindowPanel({
  title,
  icon,
  tabs,
  activeTab: controlledTab,
  onTabChange,
  children,
  width = 380,
  height = 'auto',
  className,
  closable = false,
  onClose,
  compact = false,
  footer,
  statusBar,
}: WindowPanelProps) {
  const [internalTab, setInternalTab] = useState(tabs?.[0]?.id ?? '');
  const currentTab = controlledTab ?? internalTab;

  const handleTabChange = useCallback(
    (id: string) => {
      if (onTabChange) onTabChange(id);
      else setInternalTab(id);
    },
    [onTabChange],
  );

  const activeContent = tabs?.find((t) => t.id === currentTab)?.content;

  return (
    <div
      className={`window-panel${compact ? ' window-panel--compact' : ''}${className ? ` ${className}` : ''}`}
      style={{ width, height }}
    >
      {/* ── Title bar ── */}
      <div className="window-panel__header">
        {icon && <span className="window-panel__icon">{icon}</span>}
        {title && <span className="window-panel__title">{title}</span>}
        <span className="window-panel__spacer" />
        {closable && (
          <button
            type="button"
            className="window-panel__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>

      {/* ── Tab bar ── */}
      {tabs && tabs.length > 1 && (
        <div className="window-panel__tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === currentTab}
              className={`window-panel__tab${tab.id === currentTab ? ' window-panel__tab--active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.icon && <span className="window-panel__tab-icon">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Canvas / body ── */}
      <div className="window-panel__body">
        {tabs ? activeContent : children}
      </div>

      {/* ── Footer ── */}
      {footer && <div className="window-panel__footer">{footer}</div>}

      {/* ── Status bar ── */}
      {statusBar && <div className="window-panel__status">{statusBar}</div>}
    </div>
  );
}
