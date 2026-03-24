import { cn } from '../../lib/cn';

interface ButtonContentProps {
  label?: string;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const ButtonContent = ({ label, children, leftIcon, rightIcon }: ButtonContentProps) => (
  <>
    {leftIcon && <span className={cn('prisma-btn__icon', 'prisma-btn__icon--left')}>{leftIcon}</span>}
    {label ? <span>{label}</span> : children}
    {rightIcon && <span className={cn('prisma-btn__icon', 'prisma-btn__icon--right')}>{rightIcon}</span>}
  </>
);
