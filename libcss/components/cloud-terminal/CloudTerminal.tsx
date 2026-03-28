import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { cn } from '../lib/cn';
import type { CloudTerminalConfig } from './CloudTerminal.types';
import { DEFAULT_TITLE } from './CloudTerminal.constants';
import { useXterm } from './useXterm';
import { useDesktopWindow } from '../../hooks/useDesktopWindow';
import { useSplitPane } from './useSplitPane';
import { getTheme, applyThemeTokens, type TerminalThemeDef } from './themes';
import { animClasses, ANIM_PRESET_SMOOTH } from './animations';
import { TerminalBackground } from './TerminalBackground';
import { TerminalNavRail, type NavRailItem } from './TerminalNavRail';
import { TerminalHeader } from './TerminalHeader';
import { TerminalViewport } from './TerminalViewport';
import { TerminalStatusBar } from './TerminalStatusBar';
import { TerminalEditor } from './TerminalEditor';
import { TerminalDocs } from './TerminalDocs';
import { TerminalThemeSwitcher } from './TerminalThemeSwitcher';
import { TerminalAnimationSwitcher } from './TerminalAnimationSwitcher';
import { SplitContainer } from './SplitContainer';
import { KeyRipple } from './KeyRipple';
import type { BackgroundEffectId } from './backgroundEffects';
import './CloudTerminal.css';
import '@xterm/xterm/css/xterm.css';

/**
 * CloudTerminal — A fully-featured, composable web terminal component.
 *
 * Built entirely from libcss primitives.
 * Connects to a node-pty backend via socket.io and renders through xterm.js.
 *
 * Features:
 * - 12 built-in themes with glassmorphism & gradients
 * - Collapsible sidebar
 * - Terminal splitting (horizontal/vertical) with drag resize
 * - Drag-and-drop terminal tabs
 * - Configurable animations from libcss animation library
 * - Fully customizable via props
 *
 * @example
 * ```tsx
 * <CloudTerminal
 *   title="MY_SERVER"
 *   themeId="cyber-neon"
 *   showNavRail
 *   sidebarCollapsible
 *   enableSplit
 *   showThemeSwitcher
 *   animationPreset={ANIM_PRESET_SMOOTH}
 * />
 * ```
 */
export function CloudTerminal({
  socketUrl,
  fontSize,
  fontFamily,
  theme: themeProp,
  allowTransparency,
  cursorBlink,
  /* Layout */
  showNavRail = true,
  sidebarCollapsible = true,
  sidebarCollapsed: sidebarCollapsedProp = true,
  showHeader = true,
  showStatusBar = true,
  showEffects = true,
  enableEditor = true,
  enableDocs = true,
  /* Themes */
  colorScheme = 'dark',
  themeId: initialThemeId = 'inferno',
  showThemeSwitcher = true,
  /* Split */
  enableSplit = true,
  enableTabDragDrop = true,
  showTabs = true,
  /* Animations */
  animationPreset = ANIM_PRESET_SMOOTH,
  /* Branding */
  brand,
  title = DEFAULT_TITLE,
  /* Misc */
  className = '',
  style,
  docsContent,
}: CloudTerminalConfig) {
  /* ── Theme state ──────────────────────────────── */
  const [themeId, setThemeId] = useState(initialThemeId);
  const [themeTransitioning, setThemeTransitioning] = useState(false);
  const currentTheme: TerminalThemeDef = getTheme(themeId);
  const rootRef = useRef<HTMLDivElement>(null);

  // Apply theme tokens to root element
  useEffect(() => {
    if (rootRef.current) {
      applyThemeTokens(rootRef.current, currentTheme);
    }
  }, [currentTheme]);

  const handleThemeChange = useCallback((id: string) => {
    setThemeTransitioning(true);
    setThemeId(id);
    setTimeout(() => setThemeTransitioning(false), 600);
  }, []);

  /* ── Background effect state ───────────────────── */
  const [bgEffectId, setBgEffectId] = useState<BackgroundEffectId>('bubbles');

  /* ── Sidebar ──────────────────────────────────── */
  const [sidebarCollapsed, setSidebarCollapsed] = useState(sidebarCollapsedProp);
  const toggleSidebar = useCallback(() => setSidebarCollapsed((v) => !v), []);

  /* ── Desktop window ───────────────────────────── */
  const desktop = useDesktopWindow();

  /* ── Views ────────────────────────────────────── */
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [activeView, setActiveView] = useState<'terminal' | 'docs'>('terminal');
  const isDocsView = activeView === 'docs' && enableDocs;

  /* ── Split pane state ─────────────────────────── */
  const split = useSplitPane();

  /* ── Legacy single-pane xterm (only created when split is OFF) ── */
  const legacyXtermOpts = useMemo(() => ({
    socketUrl,
    fontSize,
    fontFamily,
    theme: { ...currentTheme.xterm, ...themeProp },
    cursorBlink,
    allowTransparency: allowTransparency ?? true,
    disabled: enableSplit,  // don't connect when split panes are used
  }), [socketUrl, fontSize, fontFamily, currentTheme.xterm, themeProp, cursorBlink, allowTransparency, enableSplit]);
  const xterm = useXterm(legacyXtermOpts);

  const isEditorOpen = !!xterm.editorFile && enableEditor;

  /* ── Fullscreen toggle ────────────────────────── */
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((v) => !v);
    setTimeout(() => xterm.refit(), 100);
  }, [xterm]);

  /* ── Glass level from theme ───────────────────── */
  const glassClass = (() => {
    if (currentTheme.glass >= 0.8) return 'ct--glass-3';
    if (currentTheme.glass >= 0.5) return 'ct--glass-2';
    if (currentTheme.glass >= 0.2) return 'ct--glass-1';
    return '';
  })();

  /* ── Nav rail items ───────────────────────────── */
  const navItems = useMemo<NavRailItem[]>(() => {
    const items: NavRailItem[] = [
      {
        id: 'terminal',
        label: 'Terminal',
        active: activeView === 'terminal',
        onClick: () => { setActiveView('terminal'); xterm.setDocsRequested(false); },
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
        ),
      },
    ];

    if (enableDocs) {
      items.push({
        id: 'docs',
        label: 'Documentation',
        active: activeView === 'docs',
        onClick: () => setActiveView('docs'),
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        ),
      });
    }

    items.push(
      {
        id: 'cpu',
        label: 'System',
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
        ),
      },
      {
        id: 'activity',
        label: 'Activity',
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        ),
      },
      {
        id: 'security',
        label: 'Security',
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        ),
      },
    );

    return items;
  }, [activeView, enableDocs, xterm]);


  /* ── Compose ──────────────────────────────────── */
  return (
    <div
      ref={rootRef}
      className={cn(
        'ct',
        `ct--${colorScheme}`,
        isFullscreen && 'ct--fullscreen',
        sidebarCollapsed && 'ct--sidebar-collapsed',
        glassClass,
        themeTransitioning && 'ct--theme-transitioning',
        className,
      )}
      style={style}
      data-theme={colorScheme}
      data-ct-theme={themeId}
    >
      {/* Atmospheric background */}
      {showEffects && (
        <TerminalBackground
          className={animationPreset?.background ? animClasses(animationPreset.background) : ''}
          effectId={bgEffectId}
        />
      )}

      {/* Interactive cursor blob — disabled */}

      {/* Keyboard ripple waves */}
      {showEffects && <KeyRipple />}

      {/* Sidebar bookmark-tab toggle — thin strip on navrail edge */}
      {showNavRail && sidebarCollapsible && (
        <button
          type="button"
          className={cn('ct__sidebar-toggle', sidebarCollapsed && 'ct__sidebar-toggle--collapsed')}
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? 'Show sidebar' : 'Hide sidebar'}
          title={sidebarCollapsed ? 'Show sidebar' : 'Hide sidebar'}
        >
          {sidebarCollapsed ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18"/></svg>
          )}
        </button>
      )}

      {/* Left nav rail */}
      {showNavRail && (
        <TerminalNavRail
          items={navItems}
          collapsed={sidebarCollapsed}
          className={animationPreset?.navRail ? animClasses(animationPreset.navRail) : ''}
          brand={brand ?? (
            <div className="ct-navrail__default-brand">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
            </div>
          )}
          footer={
            <span className="ct-navrail__bolt">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </span>
          }
        />
      )}

      {/* Main content column */}
      <div className={cn('ct__main', showNavRail && !sidebarCollapsed && 'ct__main--with-rail')}>
        {/* Header bar */}
        {showHeader && (
          <TerminalHeader
            title={title}
            status={enableSplit ? 'connected' : xterm.status}
            isFullscreen={isFullscreen}
            onClear={enableSplit ? undefined : xterm.clearBuffer}
            onToggleFullscreen={toggleFullscreen}
            onClose={desktop.isElectron ? desktop.close : undefined}
            onMinimize={desktop.isElectron ? desktop.minimize : undefined}
            onMaximize={desktop.isElectron ? desktop.maximize : undefined}
            className={animationPreset?.header ? animClasses(animationPreset.header) : ''}
            extra={
              <>
                {showThemeSwitcher && (
                  <>
                    <TerminalThemeSwitcher
                      currentThemeId={themeId}
                      onSelectTheme={handleThemeChange}
                    />
                    <TerminalAnimationSwitcher
                      currentEffectId={bgEffectId}
                      onSelectEffect={(id) => setBgEffectId(id as BackgroundEffectId)}
                    />
                  </>
                )}
                {desktop.isElectron && (
                  <>
                    <button className="ct-header__btn" onClick={desktop.zoomOut} title="Zoom Out (Ctrl+-)" aria-label="Zoom out">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </button>
                    <button className="ct-header__btn" onClick={desktop.zoomReset} title="Reset Zoom (Ctrl+0)" aria-label="Reset zoom">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </button>
                    <button className="ct-header__btn" onClick={desktop.zoomIn} title="Zoom In (Ctrl+=)" aria-label="Zoom in">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </button>
                  </>
                )}
              </>
            }
          />
        )}

        {/* Terminal card */}
        <main className={cn(
          'ct__workspace',
          isFullscreen && 'ct__workspace--fullscreen',
          animationPreset?.card ? animClasses(animationPreset.card) : '',
        )}>
          <div className="ct__card">
            {/* Viewport stack */}
            <div className="ct__viewport-stack">
              {/* ── Split terminal mode ───────────── */}
              {enableSplit && !isDocsView && (
                <SplitContainer
                  node={split.state.root}
                  split={split}
                  xtermTheme={{ ...currentTheme.xterm, ...themeProp }}
                  fontSize={fontSize}
                  fontFamily={fontFamily}
                  socketUrl={socketUrl}
                  cursorBlink={cursorBlink}
                  showScanlines={showEffects}
                  paneAnimation={animationPreset?.paneEnter}
                />
              )}

              {/* ── Legacy single-pane mode ───────── */}
              {!enableSplit && !isDocsView && (
                <TerminalViewport
                  containerRef={xterm.containerRef}
                  visible
                  showScanlines={showEffects}
                />
              )}

              {/* Docs overlay */}
              {isDocsView && docsContent && (
                <TerminalDocs visible>
                  <div className="ct-docs__prose" dangerouslySetInnerHTML={{ __html: '' }}>
                  </div>
                </TerminalDocs>
              )}
              {isDocsView && !docsContent && (
                <TerminalDocs visible>
                  <p className="ct-docs__empty">No documentation loaded.</p>
                </TerminalDocs>
              )}

              {/* Editor overlay (absolute) — only in legacy mode */}
              {!enableSplit && isEditorOpen && xterm.editorFile && (
                <TerminalEditor
                  file={xterm.editorFile}
                  onSave={xterm.saveEditor}
                  onClose={xterm.closeEditor}
                />
              )}
            </div>

            {/* Status bar */}
            {showStatusBar && (
              <TerminalStatusBar
                status={enableSplit ? 'connected' : xterm.status}
                sessionId={enableSplit ? `${split.groupIds.length} panes` : xterm.socketRef.current?.id}
                className={animationPreset?.statusBar ? animClasses(animationPreset.statusBar) : ''}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
