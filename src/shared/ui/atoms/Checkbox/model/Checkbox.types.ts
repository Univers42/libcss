import type { InputHTMLAttributes, ReactNode } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  readonly label?: ReactNode;
  readonly checkboxSize?: CheckboxSize;
  readonly hasError?: boolean;
}
