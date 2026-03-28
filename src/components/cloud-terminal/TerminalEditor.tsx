import { useState } from 'react';
import { cn } from '../lib/cn';
import type { EditorFile } from './CloudTerminal.types';

export interface TerminalEditorProps {
  file: EditorFile;
  onSave: (file: EditorFile) => void;
  onClose: () => void;
  visible?: boolean;
  className?: string;
}

/**
 * Full-screen file editor overlay.
 * Uses prisma-styled chrome with save/close actions.
 */
export function TerminalEditor({
  file,
  onSave,
  onClose,
  visible = true,
  className = '',
}: Readonly<TerminalEditorProps>) {
  const [content, setContent] = useState(file.content);
  const lineCount = content.split('\n').length;
  const charCount = content.length;

  if (!visible) return null;

  return (
    <div className={cn('ct-editor', className)}>
      {/* Editor header */}
      <div className="ct-editor__header">
        <div className="ct-editor__file-info">
          <span className="ct-editor__icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </span>
          <div className="ct-editor__meta">
            <span className="ct-editor__label">Editing Resource</span>
            <span className="ct-editor__filename">{file.filename}</span>
          </div>
        </div>

        <div className="ct-editor__actions">
          <button
            className="ct-editor__save-btn"
            onClick={() => onSave({ filename: file.filename, content })}
            type="button"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Commit Changes
          </button>
          <button
            className="ct-editor__close-btn"
            onClick={onClose}
            type="button"
            aria-label="Close editor"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Editor body */}
      <textarea
        className="ct-editor__textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        spellCheck={false}
        autoFocus
      />

      {/* Editor footer */}
      <div className="ct-editor__footer">
        <div className="ct-editor__footer-left">
          <span className="ct-editor__footer-tag">UTF-8</span>
          <span className="ct-editor__footer-tag">Plain Text</span>
        </div>
        <span className="ct-editor__footer-stats">
          L: {lineCount} &nbsp; C: {charCount}
        </span>
      </div>
    </div>
  );
}
