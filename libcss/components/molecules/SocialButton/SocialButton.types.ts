import type { ReactNode } from 'react';
import type { ButtonProps } from '../../atoms/Button/Button.types';

export interface SocialButtonProps extends Omit<ButtonProps, 'leftIcon' | 'variant'> {
  readonly provider: 'google' | 'github' | 'azure';
  readonly icon: ReactNode;
  readonly label: string;
}
