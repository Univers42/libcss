import type { InputHTMLAttributes } from 'react';

export type InputVariant = 'default' | 'filled' | 'outline';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  readonly variant?: InputVariant;
  readonly inputSize?: InputSize;
  readonly hasError?: boolean;
  readonly fullWidth?: boolean;
}
