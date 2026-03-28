import type { ButtonHTMLAttributes, FC } from 'react';

export const SuccessButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button className={`btn btn--success ${className ?? ''}`} {...props}>
    {children}
  </button>
);
