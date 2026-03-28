import { cn } from '../lib/cn';

export interface TerminalDocsProps {
  /** Rendered markdown or React content */
  children: React.ReactNode;
  visible?: boolean;
  className?: string;
}

/**
 * Documentation viewer overlay — displays markdown content
 * with prisma prose styling inside the terminal viewport.
 */
export function TerminalDocs({
  children,
  visible = true,
  className = '',
}: Readonly<TerminalDocsProps>) {
  if (!visible) return null;

  return (
    <div className={cn('ct-docs', className)}>
      <div className="ct-docs__content">{children}</div>
    </div>
  );
}
