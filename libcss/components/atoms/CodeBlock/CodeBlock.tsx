import { useState, type JSX } from 'react';
import { cn } from '../../lib/cn';
import { DEFAULT_CODE_LANGUAGE, DEFAULT_SHOW_LINE_NUMBERS } from './CodeBlock.constants';
import type { CodeBlockProps } from './CodeBlock.types';

export function CodeBlock({
  code,
  language = DEFAULT_CODE_LANGUAGE,
  showLineNumbers = DEFAULT_SHOW_LINE_NUMBERS,
  highlightLines = [],
  mermaid = false,
  compact = false,
  className = '',
}: CodeBlockProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const lines = code.split('\n');
  const classes = cn(
    'prisma-code',
    !showLineNumbers && 'prisma-code--no-lines',
    mermaid && 'prisma-code--mermaid',
    compact && 'prisma-code--compact',
    className,
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={classes}>
      <div className="prisma-code__header">
        <span className="prisma-code__language">{language}</span>
        <button type="button" className="prisma-code__copy" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="prisma-code__body">
        {lines.map((line, i) => (
          <div
            key={i}
            className={cn(
              'prisma-code__line',
              highlightLines.includes(i + 1) && 'prisma-code__line--highlight',
            )}
          >
            {line || '\u00A0'}
          </div>
        ))}
      </div>
    </div>
  );
}
