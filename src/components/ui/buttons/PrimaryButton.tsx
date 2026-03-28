/**
 * UI PrimaryButton — Stub component
 */
import type { ButtonHTMLAttributes, FC } from 'react';

export const PrimaryButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button className={`btn btn--primary ${className ?? ''}`} {...props}>
    {children}
  </button>
);
