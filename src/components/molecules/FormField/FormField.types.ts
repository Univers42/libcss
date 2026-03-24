import type { ReactNode } from 'react';

export interface FormFieldProps {
  readonly label: string;
  readonly error?: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly id?: string;
  readonly required?: boolean;
}
