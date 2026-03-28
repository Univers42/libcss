import type { ButtonHTMLAttributes, FC } from 'react';

export const GhostButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button className={`btn btn--ghost ${className ?? ''}`} {...props}>
    {children}
  </button>
);
