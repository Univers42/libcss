/**
 * UI Button — Stub re-export for consuming-app customisation
 *
 * Components import from this path; consuming apps can replace the implementation.
 */
import type { ButtonHTMLAttributes, FC } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'outlineLight';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => (
  <button className={className} {...props}>
    {children}
  </button>
);
