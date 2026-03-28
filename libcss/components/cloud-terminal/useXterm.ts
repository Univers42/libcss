import { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { io, type Socket } from 'socket.io-client';
import type { ConnectionStatus, EditorFile, TerminalThemeColors } from './CloudTerminal.types';
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_RESIZE_DEBOUNCE,
  TERMINAL_THEME_DARK,
} from './CloudTerminal.constants';

export interface UseXtermOptions {
  socketUrl?: string;
  fontSize?: number;
  fontFamily?: string;
  theme?: Partial<TerminalThemeColors>;
  cursorBlink?: boolean;
  allowTransparency?: boolean;
  /** When true, skip creating the terminal & socket (used when split panes are active) */
  disabled?: boolean;
  /** Called when the shell session exits (e.g. Ctrl+D) */
  onSessionEnd?: () => void;
}

export interface UseXtermReturn {
  /** Ref to attach to the xterm container div */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Socket.io ref */
  socketRef: React.RefObject<Socket | null>;
  /** Terminal instance ref */
  terminalRef: React.RefObject<Terminal | null>;
  /** FitAddon ref */
  fitAddonRef: React.RefObject<FitAddon | null>;
  /** Connection status */
  status: ConnectionStatus;
  /** Currently editing file (if triggered by shell `edit` command) */
  editorFile: EditorFile | null;
  /** Whether docs mode was requested */
  docsRequested: boolean;
  /** Clear the terminal buffer */
  clearBuffer: () => void;
  /** Refit the terminal to its container */
  refit: () => void;
  /** Close the editor overlay */
  closeEditor: () => void;
  /** Save the editor file */
  saveEditor: (file: EditorFile) => void;
  /** Open editor programmatically */
  openEditor: (file: EditorFile) => void;
  /** Toggle docs */
  setDocsRequested: (v: boolean) => void;
  /** TTY device name from the server (e.g. '/dev/pts/3') */
  ttyName: string | null;
}

/** 
 * Hook that manages the lifecycle of an xterm.js terminal connected
 * to a node-pty backend via socket.io.
 */
export function useXterm(options: UseXtermOptions = {}): UseXtermReturn {
  const {
    socketUrl,
    fontSize = DEFAULT_FONT_SIZE,
    fontFamily = DEFAULT_FONT_FAMILY,
    theme,
    cursorBlink = true,
    allowTransparency = true,
    disabled = false,
    onSessionEnd,
  } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const terminalRef  = useRef<Terminal | null>(null);
  const socketRef    = useRef<Socket | null>(null);
  const fitAddonRef  = useRef<FitAddon | null>(null);

  const [status, setStatus]             = useState<ConnectionStatus>('connecting');
  const [editorFile, setEditorFile]     = useState<EditorFile | null>(null);
  const [docsRequested, setDocsRequested] = useState(false);
  const [ttyName, setTtyName]           = useState<string | null>(null);

  // Keep mutable refs so the effect closures always see current state
  const editorFileRef    = useRef(editorFile);
  const docsRequestedRef = useRef(docsRequested);
  const onSessionEndRef  = useRef(onSessionEnd);
  useEffect(() => { editorFileRef.current = editorFile; }, [editorFile]);
  useEffect(() => { docsRequestedRef.current = docsRequested; }, [docsRequested]);
  useEffect(() => { onSessionEndRef.current = onSessionEnd; }, [onSessionEnd]);

  /* ── Bootstrap xterm + socket.io ────────────────── */
  useEffect(() => {
    if (disabled) return;
    const el = containerRef.current;
    if (!el) return;

    const mergedTheme = { ...TERMINAL_THEME_DARK, ...theme };

    const terminal = new Terminal({
      cursorBlink,
      fontFamily,
      fontSize,
      letterSpacing: 0,
      lineHeight: 1.15,
      theme: mergedTheme,
      allowTransparency,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(el);
    fitAddon.fit();
    terminal.focus();

    terminalRef.current = terminal;
    fitAddonRef.current = fitAddon;

    const socket = socketUrl ? io(socketUrl) : io();
    socketRef.current = socket;

    socket.on('connect', () => setStatus('connected'));
    socket.on('disconnect', () => setStatus('disconnected'));
    socket.on('output', (data: string) => terminal.write(data));
    socket.on('clear', () => terminal.clear());
    socket.on('session-ended', () => {
      setStatus('disconnected');
      onSessionEndRef.current?.();
    });

    socket.on('editor-open', ({ filename, content }: { filename: string; content: string }) => {
      setEditorFile({ filename, content });
    });

    socket.on('pty-info', (info: { pid: number; tty: string }) => {
      setTtyName(info.tty);
    });

    terminal.onData((data) => {
      if (editorFileRef.current || docsRequestedRef.current) return;
      socket.emit('input', data);
    });

    terminal.onTitleChange((title) => {
      if (title.startsWith('EDIT:')) {
        socket.emit('request-edit', title.replace('EDIT:', ''));
      } else if (title.startsWith('DOCS:')) {
        setDocsRequested(true);
      }
    });

    /* ── Resize handling ──────────────────────────── */
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        fitAddon.fit();
        socket.emit('resize', { cols: terminal.cols, rows: terminal.rows });
      }, DEFAULT_RESIZE_DEBOUNCE);
    };

    window.addEventListener('resize', handleResize);
    // Initial fit
    setTimeout(handleResize, 80);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      socket.disconnect();
      terminal.dispose();
      terminalRef.current = null;
      socketRef.current = null;
      fitAddonRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Public API ─────────────────────────────────── */
  const clearBuffer = useCallback(() => terminalRef.current?.clear(), []);

  const refit = useCallback(() => {
    fitAddonRef.current?.fit();
    const t = terminalRef.current;
    const s = socketRef.current;
    if (t && s) s.emit('resize', { cols: t.cols, rows: t.rows });
  }, []);

  const closeEditor = useCallback(() => setEditorFile(null), []);

  const saveEditor = useCallback((file: EditorFile) => {
    socketRef.current?.emit('save-file', file);
    setEditorFile(null);
  }, []);

  const openEditor = useCallback((file: EditorFile) => setEditorFile(file), []);

  return {
    containerRef,
    socketRef,
    terminalRef,
    fitAddonRef,
    status,
    editorFile,
    docsRequested,
    clearBuffer,
    refit,
    closeEditor,
    saveEditor,
    openEditor,
    setDocsRequested,
    ttyName,
  };
}
