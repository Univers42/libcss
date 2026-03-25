export interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export function Kbd({ children, className }: KbdProps) {
  return <kbd className={`kbd${className ? ` ${className}` : ''}`}>{children}</kbd>;
}
