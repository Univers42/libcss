import type { InputHTMLAttributes, ReactNode } from 'react';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  readonly label?: ReactNode;
  readonly switchSize?: SwitchSize;
  readonly hasError?: boolean;
}
