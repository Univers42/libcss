import { Button } from '../../atoms/Button';
import { DEFAULT_SOCIAL_LABELS } from './SocialButton.constants';
import type { SocialButtonProps } from './SocialButton.types';
import { cn } from '../../lib';

export function SocialButton({
  provider,
  icon,
  label,
  className,
  ...props
}: SocialButtonProps) {
  const displayLabel = label ?? DEFAULT_SOCIAL_LABELS[provider];

  return (
    <Button
      variant="outline"
      leftIcon={icon}
      className={cn('prisma-social-button', `prisma-social-button--${provider}`, className)}
      aria-label={`Sign in with ${displayLabel}`}
      {...(props as any)}
    >
      {displayLabel}
    </Button>
  );
}
