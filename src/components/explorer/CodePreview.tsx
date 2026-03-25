import { useCallback, useState } from 'react';
import type { ComponentEntry } from '../../core/types';

interface CodePreviewProps {
  entry: ComponentEntry;
  props: Record<string, unknown>;
}

function generateJsx(entry: ComponentEntry, props: Record<string, unknown>): string {
  const tag = entry.name.replace(/\s+/g, '');
  const lines: string[] = [];
  const attrs: string[] = [];

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null) continue;
    if (value === entry.defaultProps[key]) continue;

    if (typeof value === 'string') {
      attrs.push(`${key}="${value}"`);
    } else if (typeof value === 'boolean') {
      if (value) attrs.push(key);
    } else if (typeof value === 'number') {
      attrs.push(`${key}={${value}}`);
    } else {
      attrs.push(`${key}={${JSON.stringify(value)}}`);
    }
  }

  if (attrs.length === 0) {
    lines.push(`<${tag} />`);
  } else if (attrs.length <= 2) {
    lines.push(`<${tag} ${attrs.join(' ')} />`);
  } else {
    lines.push(`<${tag}`);
    for (const attr of attrs) {
      lines.push(`  ${attr}`);
    }
    lines.push('/>');
  }

  return lines.join('\n');
}

export function CodePreview({ entry, props }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);
  const code = generateJsx(entry, props);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="shell-code">
      <div className="shell-code__header">
        <span className="shell-code__title">JSX</span>
        <button type="button" className="shell-code__copy" onClick={handleCopy}>
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="shell-code__code">
        <code>{code}</code>
      </pre>
    </div>
  );
}
