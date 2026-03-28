import type { ButtonHTMLAttributes, FC } from 'react';

export const SecondaryButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button className={`btn btn--secondary ${className ?? ''}`} {...props}>
    {children}
  </button>
);
