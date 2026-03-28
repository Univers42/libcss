import type { ButtonHTMLAttributes, FC } from 'react';

export const DangerButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button className={`btn btn--danger ${className ?? ''}`} {...props}>
    {children}
  </button>
);
