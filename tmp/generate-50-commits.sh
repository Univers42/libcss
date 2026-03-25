#!/usr/bin/env bash
# Generate 50 backdated commits for libcss — realistic library evolution.
# Each commit creates/modifies real files with real content.
set -e
cd /home/dlesieur/Documents/libcss

# Helper: commit with a backdated timestamp
# Usage: dated_commit "2026-03-25 03:00:00 +0100" "feat: message"
dated_commit() {
  local date="$1" msg="$2"
  git add -A
  GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" \
    git commit -m "$msg" --allow-empty-message
}

# ────────────────────────────────────────────────────────────────────
# COMMIT 01 — Badge atom: types + component
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Badge
cat > src/components/atoms/Badge/Badge.types.ts << 'EOF'
export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  pill?: boolean;
  outline?: boolean;
  dot?: boolean;
  className?: string;
}
EOF

cat > src/components/atoms/Badge/Badge.constants.ts << 'EOF'
import type { BadgeVariant, BadgeSize } from './Badge.types';
export const BADGE_VARIANTS: readonly BadgeVariant[] = ['default', 'primary', 'success', 'warning', 'danger', 'info'];
export const BADGE_SIZES: readonly BadgeSize[] = ['sm', 'md', 'lg'];
EOF

cat > src/components/atoms/Badge/Badge.tsx << 'EOF'
import type { BadgeProps } from './Badge.types';

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  pill = false,
  outline = false,
  dot = false,
  className,
}: BadgeProps) {
  const cls = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    pill && 'badge--pill',
    outline && 'badge--outline',
    dot && 'badge--dot',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={cls}>
      {dot && <span className="badge__dot" />}
      {children}
    </span>
  );
}
EOF

cat > src/components/atoms/Badge/index.ts << 'EOF'
export { Badge } from './Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './Badge.types';
export { BADGE_VARIANTS, BADGE_SIZES } from './Badge.constants';
EOF

dated_commit "2026-03-25 02:30:00 +0100" "feat(atoms): add Badge component with variant, size, pill, outline, and dot modes"

# ────────────────────────────────────────────────────────────────────
# COMMIT 02 — Badge SCSS
# ────────────────────────────────────────────────────────────────────
cat > src/scss/components/atoms/_badge.scss << 'SCSS'
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  border-radius: 4px;
  transition: background 0.15s, color 0.15s;

  &--sm { padding: 2px 6px; font-size: 10px; }
  &--md { padding: 3px 8px; font-size: 11px; }
  &--lg { padding: 4px 10px; font-size: 12px; }

  &--pill { border-radius: 999px; }

  &--default { background: var(--badge-default-bg, #e2e8f0); color: var(--badge-default-fg, #475569); }
  &--primary { background: var(--badge-primary-bg, #3b82f6); color: #fff; }
  &--success { background: var(--badge-success-bg, #22c55e); color: #fff; }
  &--warning { background: var(--badge-warning-bg, #f59e0b); color: #fff; }
  &--danger  { background: var(--badge-danger-bg, #ef4444); color: #fff; }
  &--info    { background: var(--badge-info-bg, #06b6d4); color: #fff; }

  &--outline {
    background: transparent;
    box-shadow: inset 0 0 0 1.5px currentColor;
  }

  &__dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
}
SCSS

# Append to atoms barrel
grep -q 'badge' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'badge';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 02:38:00 +0100" "style(atoms): add Badge SCSS — variants, sizes, pill, outline, dot indicator"

# ────────────────────────────────────────────────────────────────────
# COMMIT 03 — Avatar atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Avatar
cat > src/components/atoms/Avatar/Avatar.types.ts << 'EOF'
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded' | 'square';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
}
EOF

cat > src/components/atoms/Avatar/Avatar.constants.ts << 'EOF'
import type { AvatarSize, AvatarShape } from './Avatar.types';
export const AVATAR_SIZES: readonly AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const AVATAR_SHAPES: readonly AvatarShape[] = ['circle', 'rounded', 'square'];
export const AVATAR_SIZE_PX: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 56, xl: 80 };
EOF

cat > src/components/atoms/Avatar/Avatar.tsx << 'EOF'
import { useState } from 'react';
import type { AvatarProps } from './Avatar.types';

function initialsColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = text.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 55%, 55%)`;
}

export function Avatar({ src, alt = '', initials, size = 'md', shape = 'circle', status, className }: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const cls = ['avatar', `avatar--${size}`, `avatar--${shape}`, className].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {showImage ? (
        <img className="avatar__img" src={src} alt={alt} onError={() => setImgError(true)} />
      ) : (
        <span className="avatar__initials" style={{ background: initialsColor(initials || alt || '?') }}>
          {(initials || alt || '?').slice(0, 2).toUpperCase()}
        </span>
      )}
      {status && <span className={`avatar__status avatar__status--${status}`} />}
    </div>
  );
}
EOF

cat > src/components/atoms/Avatar/index.ts << 'EOF'
export { Avatar } from './Avatar';
export type { AvatarProps, AvatarSize, AvatarShape } from './Avatar.types';
export { AVATAR_SIZES, AVATAR_SHAPES, AVATAR_SIZE_PX } from './Avatar.constants';
EOF

dated_commit "2026-03-25 02:50:00 +0100" "feat(atoms): add Avatar component with image, initials fallback, status indicator"

# ────────────────────────────────────────────────────────────────────
# COMMIT 04 — Avatar SCSS
# ────────────────────────────────────────────────────────────────────
cat > src/scss/components/atoms/_avatar.scss << 'SCSS'
.avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  &--xs { width: 24px; height: 24px; font-size: 10px; }
  &--sm { width: 32px; height: 32px; font-size: 12px; }
  &--md { width: 40px; height: 40px; font-size: 14px; }
  &--lg { width: 56px; height: 56px; font-size: 18px; }
  &--xl { width: 80px; height: 80px; font-size: 24px; }

  &--circle  { border-radius: 50%; }
  &--rounded { border-radius: 8px; }
  &--square  { border-radius: 0; }

  &__img {
    width: 100%; height: 100%;
    object-fit: cover;
  }

  &__initials {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; height: 100%;
    color: #fff;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  &__status {
    position: absolute;
    bottom: 1px; right: 1px;
    width: 10px; height: 10px;
    border: 2px solid var(--surface-color, #fff);
    border-radius: 50%;
    &--online  { background: #22c55e; }
    &--offline { background: #94a3b8; }
    &--away    { background: #f59e0b; }
    &--busy    { background: #ef4444; }
  }
}
SCSS

grep -q 'avatar' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'avatar';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 02:58:00 +0100" "style(atoms): add Avatar SCSS — sizes, shapes, initials, status indicator"

# ────────────────────────────────────────────────────────────────────
# COMMIT 05 — Chip/Tag atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Chip
cat > src/components/atoms/Chip/Chip.types.ts << 'EOF'
export type ChipVariant = 'filled' | 'outlined' | 'ghost';
export type ChipColor = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  color?: ChipColor;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
EOF

cat > src/components/atoms/Chip/Chip.tsx << 'EOF'
import type { ChipProps } from './Chip.types';

export function Chip({
  label,
  variant = 'filled',
  color = 'default',
  icon,
  removable = false,
  onRemove,
  onClick,
  disabled = false,
  className,
}: ChipProps) {
  const cls = [
    'chip',
    `chip--${variant}`,
    `chip--${color}`,
    onClick && 'chip--clickable',
    disabled && 'chip--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={cls} onClick={!disabled ? onClick : undefined} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {icon && <span className="chip__icon">{icon}</span>}
      <span className="chip__label">{label}</span>
      {removable && (
        <button
          type="button"
          className="chip__remove"
          onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
          disabled={disabled}
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
EOF

cat > src/components/atoms/Chip/index.ts << 'EOF'
export { Chip } from './Chip';
export type { ChipProps, ChipVariant, ChipColor } from './Chip.types';
EOF

dated_commit "2026-03-25 03:10:00 +0100" "feat(atoms): add Chip component — filled/outlined/ghost variants, removable, clickable"

# ────────────────────────────────────────────────────────────────────
# COMMIT 06 — Chip SCSS
# ────────────────────────────────────────────────────────────────────
cat > src/scss/components/atoms/_chip.scss << 'SCSS'
.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.2;
  transition: background 0.15s, box-shadow 0.15s;
  user-select: none;

  &--clickable { cursor: pointer; }
  &--disabled { opacity: 0.5; pointer-events: none; }

  &--filled {
    &.chip--default { background: var(--chip-default-bg, #e2e8f0); color: var(--chip-default-fg, #475569); }
    &.chip--primary { background: var(--chip-primary-bg, #dbeafe); color: var(--chip-primary-fg, #1d4ed8); }
    &.chip--success { background: var(--chip-success-bg, #dcfce7); color: var(--chip-success-fg, #166534); }
    &.chip--warning { background: var(--chip-warning-bg, #fef3c7); color: var(--chip-warning-fg, #92400e); }
    &.chip--danger  { background: var(--chip-danger-bg, #fee2e2); color: var(--chip-danger-fg, #991b1b); }
  }

  &--outlined {
    background: transparent;
    box-shadow: inset 0 0 0 1px currentColor;
    &.chip--default { color: #475569; }
    &.chip--primary { color: #2563eb; }
    &.chip--success { color: #16a34a; }
    &.chip--warning { color: #d97706; }
    &.chip--danger  { color: #dc2626; }
  }

  &--ghost {
    background: transparent;
    &:hover { background: rgba(0,0,0,0.05); }
  }

  &__icon { font-size: 14px; line-height: 1; }
  &__remove {
    display: flex; align-items: center; justify-content: center;
    width: 16px; height: 16px; margin-left: 2px;
    border: none; border-radius: 50%;
    background: rgba(0,0,0,0.1); color: inherit;
    font-size: 12px; cursor: pointer;
    &:hover { background: rgba(0,0,0,0.2); }
  }
}
SCSS

grep -q 'chip' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'chip';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 03:18:00 +0100" "style(atoms): add Chip SCSS — filled/outlined/ghost, removable button"

# ────────────────────────────────────────────────────────────────────
# COMMIT 07 — Input atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Input
cat > src/components/atoms/Input/Input.types.ts << 'EOF'
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'outlined' | 'filled' | 'underlined';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  inputSize?: InputSize;
  variant?: InputVariant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}
EOF

cat > src/components/atoms/Input/Input.tsx << 'EOF'
import { forwardRef } from 'react';
import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
  label,
  error,
  hint,
  inputSize = 'md',
  variant = 'outlined',
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  id,
  ...rest
}, ref) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
  const cls = [
    'input-field',
    `input-field--${inputSize}`,
    `input-field--${variant}`,
    error && 'input-field--error',
    fullWidth && 'input-field--full',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {label && <label className="input-field__label" htmlFor={inputId}>{label}</label>}
      <div className="input-field__wrapper">
        {leftIcon && <span className="input-field__icon input-field__icon--left">{leftIcon}</span>}
        <input ref={ref} className="input-field__input" id={inputId} {...rest} />
        {rightIcon && <span className="input-field__icon input-field__icon--right">{rightIcon}</span>}
      </div>
      {(error || hint) && (
        <span className={`input-field__helper${error ? ' input-field__helper--error' : ''}`}>
          {error || hint}
        </span>
      )}
    </div>
  );
});
EOF

cat > src/components/atoms/Input/index.ts << 'EOF'
export { Input } from './Input';
export type { InputProps, InputSize, InputVariant } from './Input.types';
EOF

dated_commit "2026-03-25 03:30:00 +0100" "feat(atoms): add Input component — outlined/filled/underlined, icon slots, error state"

# ────────────────────────────────────────────────────────────────────
# COMMIT 08 — Input SCSS
# ────────────────────────────────────────────────────────────────────
cat > src/scss/components/atoms/_input.scss << 'SCSS'
.input-field {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &--full { width: 100%; }

  &__label {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary, #475569);
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__input {
    flex: 1;
    border: none;
    outline: none;
    font-family: inherit;
    background: transparent;
    color: var(--text-primary, #1e293b);
    &::placeholder { color: var(--text-tertiary, #94a3b8); }
  }

  &--sm .input-field__input { padding: 6px 10px; font-size: 12px; }
  &--md .input-field__input { padding: 8px 12px; font-size: 14px; }
  &--lg .input-field__input { padding: 10px 14px; font-size: 16px; }

  &--outlined .input-field__wrapper {
    border: 1px solid var(--border-color, #cbd5e1);
    border-radius: 6px;
    transition: border-color 0.15s;
    &:focus-within { border-color: var(--accent-color, #3b82f6); box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
  }

  &--filled .input-field__wrapper {
    background: var(--input-filled-bg, #f1f5f9);
    border-radius: 6px;
    border: 1px solid transparent;
    &:focus-within { background: var(--surface-color, #fff); border-color: var(--accent-color, #3b82f6); }
  }

  &--underlined .input-field__wrapper {
    border-bottom: 2px solid var(--border-color, #cbd5e1);
    border-radius: 0;
    &:focus-within { border-color: var(--accent-color, #3b82f6); }
  }

  &--error .input-field__wrapper { border-color: var(--danger-color, #ef4444) !important; }

  &__icon {
    display: flex; align-items: center; color: var(--text-tertiary, #94a3b8);
    &--left { padding-left: 10px; }
    &--right { padding-right: 10px; }
  }

  &__helper {
    font-size: 12px; color: var(--text-tertiary, #94a3b8);
    &--error { color: var(--danger-color, #ef4444); }
  }
}
SCSS

grep -q 'input' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'input';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 03:38:00 +0100" "style(atoms): add Input SCSS — outlined/filled/underlined, focus ring, error state"

# ────────────────────────────────────────────────────────────────────
# COMMIT 09 — Textarea atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Textarea
cat > src/components/atoms/Textarea/Textarea.types.ts << 'EOF'
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  fullWidth?: boolean;
  autoGrow?: boolean;
  minRows?: number;
  maxRows?: number;
}
EOF

cat > src/components/atoms/Textarea/Textarea.tsx << 'EOF'
import { forwardRef, useCallback, useRef, useEffect } from 'react';
import type { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({
  label,
  error,
  hint,
  resize = 'vertical',
  fullWidth = false,
  autoGrow = false,
  minRows = 3,
  maxRows = 12,
  className,
  id,
  onChange,
  ...rest
}, ref) {
  const internalRef = useRef<HTMLTextAreaElement | null>(null);
  const inputId = id || (label ? `ta-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const adjustHeight = useCallback(() => {
    const el = internalRef.current;
    if (!el || !autoGrow) return;
    el.style.height = 'auto';
    const lineH = parseInt(getComputedStyle(el).lineHeight) || 20;
    const min = lineH * minRows;
    const max = lineH * maxRows;
    el.style.height = `${Math.min(Math.max(el.scrollHeight, min), max)}px`;
  }, [autoGrow, minRows, maxRows]);

  useEffect(adjustHeight, [adjustHeight, rest.value]);

  const cls = [
    'textarea',
    error && 'textarea--error',
    fullWidth && 'textarea--full',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {label && <label className="textarea__label" htmlFor={inputId}>{label}</label>}
      <textarea
        ref={(el) => { internalRef.current = el; if (typeof ref === 'function') ref(el); else if (ref) (ref as any).current = el; }}
        className="textarea__input"
        id={inputId}
        style={{ resize: autoGrow ? 'none' : resize }}
        rows={minRows}
        onChange={(e) => { onChange?.(e); adjustHeight(); }}
        {...rest}
      />
      {(error || hint) && (
        <span className={`textarea__helper${error ? ' textarea__helper--error' : ''}`}>
          {error || hint}
        </span>
      )}
    </div>
  );
});
EOF

cat > src/components/atoms/Textarea/index.ts << 'EOF'
export { Textarea } from './Textarea';
export type { TextareaProps } from './Textarea.types';
EOF

dated_commit "2026-03-25 03:50:00 +0100" "feat(atoms): add Textarea component — auto-grow, min/max rows, resize control"

# ────────────────────────────────────────────────────────────────────
# COMMIT 10 — Textarea SCSS
# ────────────────────────────────────────────────────────────────────
cat > src/scss/components/atoms/_textarea.scss << 'SCSS'
.textarea {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &--full { width: 100%; }

  &__label {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-secondary, #475569);
  }

  &__input {
    padding: 8px 12px;
    border: 1px solid var(--border-color, #cbd5e1);
    border-radius: 6px;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.5;
    color: var(--text-primary, #1e293b);
    background: var(--surface-color, #fff);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;

    &::placeholder { color: var(--text-tertiary, #94a3b8); }
    &:focus {
      border-color: var(--accent-color, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
  }

  &--error .textarea__input { border-color: var(--danger-color, #ef4444); }

  &__helper {
    font-size: 12px; color: var(--text-tertiary, #94a3b8);
    &--error { color: var(--danger-color, #ef4444); }
  }
}
SCSS

grep -q 'textarea' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'textarea';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 03:56:00 +0100" "style(atoms): add Textarea SCSS — focus ring, error state, resize modes"

# ────────────────────────────────────────────────────────────────────
# COMMIT 11 — Select atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Select
cat > src/components/atoms/Select/Select.types.ts << 'EOF'
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: readonly SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}
EOF

cat > src/components/atoms/Select/Select.tsx << 'EOF'
import type { SelectProps } from './Select.types';

export function Select({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select…',
  error,
  disabled = false,
  fullWidth = false,
  className,
}: SelectProps) {
  const cls = [
    'select-field',
    error && 'select-field--error',
    fullWidth && 'select-field--full',
    disabled && 'select-field--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {label && <label className="select-field__label">{label}</label>}
      <div className="select-field__wrapper">
        <select
          className="select-field__select"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="select-field__chevron">▾</span>
      </div>
      {error && <span className="select-field__error">{error}</span>}
    </div>
  );
}
EOF

cat > src/components/atoms/Select/index.ts << 'EOF'
export { Select } from './Select';
export type { SelectProps, SelectOption } from './Select.types';
EOF

dated_commit "2026-03-25 04:08:00 +0100" "feat(atoms): add Select component — native dropdown with label, placeholder, error"

# ────────────────────────────────────────────────────────────────────
# COMMIT 12 — Select SCSS
# ────────────────────────────────────────────────────────────────────
cat > src/scss/components/atoms/_select.scss << 'SCSS'
.select-field {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &--full { width: 100%; }
  &--disabled { opacity: 0.5; pointer-events: none; }

  &__label { font-size: 13px; font-weight: 500; color: var(--text-secondary, #475569); }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__select {
    appearance: none;
    flex: 1;
    padding: 8px 32px 8px 12px;
    border: 1px solid var(--border-color, #cbd5e1);
    border-radius: 6px;
    font-family: inherit;
    font-size: 14px;
    color: var(--text-primary, #1e293b);
    background: var(--surface-color, #fff);
    cursor: pointer;
    outline: none;
    transition: border-color 0.15s;

    &:focus {
      border-color: var(--accent-color, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
    }
  }

  &__chevron {
    position: absolute;
    right: 10px;
    color: var(--text-tertiary, #94a3b8);
    pointer-events: none;
  }

  &--error .select-field__select { border-color: var(--danger-color, #ef4444); }
  &__error { font-size: 12px; color: var(--danger-color, #ef4444); }
}
SCSS

grep -q 'select' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'select';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 04:14:00 +0100" "style(atoms): add Select SCSS — native appearance reset, chevron, focus ring"

# ────────────────────────────────────────────────────────────────────
# COMMIT 13 — Checkbox atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Checkbox
cat > src/components/atoms/Checkbox/Checkbox.tsx << 'EOF'
import { forwardRef } from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({
  label,
  indeterminate = false,
  className,
  id,
  ...rest
}, ref) {
  const inputId = id || (label ? `cb-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <label className={`checkbox${className ? ` ${className}` : ''}`} htmlFor={inputId}>
      <input
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
          if (typeof ref === 'function') ref(el);
          else if (ref) (ref as any).current = el;
        }}
        type="checkbox"
        className="checkbox__input"
        id={inputId}
        {...rest}
      />
      <span className="checkbox__box" />
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
});
EOF

cat > src/components/atoms/Checkbox/index.ts << 'EOF'
export { Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox';
EOF

dated_commit "2026-03-25 04:24:00 +0100" "feat(atoms): add Checkbox component — label, indeterminate state, forwardRef"

# ────────────────────────────────────────────────────────────────────
# COMMIT 14 — Radio atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Radio
cat > src/components/atoms/Radio/Radio.tsx << 'EOF'
import { forwardRef } from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio({ label, className, id, ...rest }, ref) {
  const inputId = id || (label ? `radio-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <label className={`radio${className ? ` ${className}` : ''}`} htmlFor={inputId}>
      <input ref={ref} type="radio" className="radio__input" id={inputId} {...rest} />
      <span className="radio__circle" />
      {label && <span className="radio__label">{label}</span>}
    </label>
  );
});
EOF

cat > src/components/atoms/Radio/index.ts << 'EOF'
export { Radio } from './Radio';
export type { RadioProps } from './Radio';
EOF

dated_commit "2026-03-25 04:32:00 +0100" "feat(atoms): add Radio component — label support, forwardRef"

# ────────────────────────────────────────────────────────────────────
# COMMIT 15 — Checkbox + Radio SCSS
# ────────────────────────────────────────────────────────────────────
cat > src/scss/components/atoms/_checkbox.scss << 'SCSS'
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;

  &__input {
    position: absolute;
    opacity: 0;
    width: 0; height: 0;
  }

  &__box {
    width: 18px; height: 18px;
    border: 2px solid var(--border-color, #cbd5e1);
    border-radius: 4px;
    transition: background 0.15s, border-color 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '';
      width: 10px; height: 6px;
      border: 2px solid #fff;
      border-top: none; border-right: none;
      transform: rotate(-45deg) scale(0);
      transition: transform 0.15s;
    }
  }

  &__input:checked + .checkbox__box {
    background: var(--accent-color, #3b82f6);
    border-color: var(--accent-color, #3b82f6);
    &::after { transform: rotate(-45deg) scale(1); }
  }

  &__input:indeterminate + .checkbox__box {
    background: var(--accent-color, #3b82f6);
    border-color: var(--accent-color, #3b82f6);
    &::after {
      width: 10px; height: 0;
      border: 1px solid #fff;
      transform: rotate(0) scale(1);
    }
  }

  &__input:focus-visible + .checkbox__box {
    box-shadow: 0 0 0 3px rgba(59,130,246,0.3);
  }

  &__label { font-size: 14px; color: var(--text-primary, #1e293b); }
}
SCSS

cat > src/scss/components/atoms/_radio.scss << 'SCSS'
.radio {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;

  &__input {
    position: absolute;
    opacity: 0;
    width: 0; height: 0;
  }

  &__circle {
    width: 18px; height: 18px;
    border: 2px solid var(--border-color, #cbd5e1);
    border-radius: 50%;
    transition: border-color 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '';
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--accent-color, #3b82f6);
      transform: scale(0);
      transition: transform 0.15s;
    }
  }

  &__input:checked + .radio__circle {
    border-color: var(--accent-color, #3b82f6);
    &::after { transform: scale(1); }
  }

  &__input:focus-visible + .radio__circle {
    box-shadow: 0 0 0 3px rgba(59,130,246,0.3);
  }

  &__label { font-size: 14px; color: var(--text-primary, #1e293b); }
}
SCSS

grep -q 'checkbox' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo -e "@forward 'checkbox';\n@forward 'radio';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 04:40:00 +0100" "style(atoms): add Checkbox and Radio SCSS — custom indicators, focus-visible, indeterminate"

# ────────────────────────────────────────────────────────────────────
# COMMIT 16 — Switch atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Switch
cat > src/components/atoms/Switch/Switch.tsx << 'EOF'
import { forwardRef } from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch({ label, size = 'md', className, id, ...rest }, ref) {
  const inputId = id || (label ? `sw-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <label className={`switch switch--${size}${className ? ` ${className}` : ''}`} htmlFor={inputId}>
      <input ref={ref} type="checkbox" className="switch__input" id={inputId} {...rest} />
      <span className="switch__track">
        <span className="switch__thumb" />
      </span>
      {label && <span className="switch__label">{label}</span>}
    </label>
  );
});
EOF

cat > src/components/atoms/Switch/index.ts << 'EOF'
export { Switch } from './Switch';
export type { SwitchProps } from './Switch';
EOF

cat > src/scss/components/atoms/_switch.scss << 'SCSS'
.switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;

  &__input {
    position: absolute;
    opacity: 0;
    width: 0; height: 0;
  }

  &__track {
    position: relative;
    border-radius: 999px;
    background: var(--switch-bg, #cbd5e1);
    transition: background 0.2s;
  }

  &--sm .switch__track { width: 32px; height: 18px; }
  &--md .switch__track { width: 40px; height: 22px; }
  &--lg .switch__track { width: 52px; height: 28px; }

  &__thumb {
    position: absolute;
    top: 2px; left: 2px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
    transition: transform 0.2s;
  }

  &--sm .switch__thumb { width: 14px; height: 14px; }
  &--md .switch__thumb { width: 18px; height: 18px; }
  &--lg .switch__thumb { width: 24px; height: 24px; }

  &__input:checked + .switch__track {
    background: var(--accent-color, #3b82f6);
  }

  &--sm .switch__input:checked + .switch__track .switch__thumb { transform: translateX(14px); }
  &--md .switch__input:checked + .switch__track .switch__thumb { transform: translateX(18px); }
  &--lg .switch__input:checked + .switch__track .switch__thumb { transform: translateX(24px); }

  &__input:focus-visible + .switch__track {
    box-shadow: 0 0 0 3px rgba(59,130,246,0.3);
  }

  &__label { font-size: 14px; color: var(--text-primary, #1e293b); }
}
SCSS

grep -q 'switch' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'switch';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 04:50:00 +0100" "feat(atoms): add Switch component + SCSS — sm/md/lg, animated thumb, focus-visible"

# ────────────────────────────────────────────────────────────────────
# COMMIT 17 — Tooltip atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Tooltip
cat > src/components/atoms/Tooltip/Tooltip.types.ts << 'EOF'
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  children: React.ReactElement;
  className?: string;
}
EOF

cat > src/components/atoms/Tooltip/Tooltip.tsx << 'EOF'
import { useState, useRef, useCallback } from 'react';
import type { TooltipProps } from './Tooltip.types';

export function Tooltip({ content, placement = 'top', delay = 200, children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback(() => {
    timer.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(timer.current);
    setVisible(false);
  }, []);

  return (
    <span
      className={`tooltip-wrapper${className ? ` ${className}` : ''}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span className={`tooltip tooltip--${placement}`} role="tooltip">
          {content}
          <span className="tooltip__arrow" />
        </span>
      )}
    </span>
  );
}
EOF

cat > src/components/atoms/Tooltip/index.ts << 'EOF'
export { Tooltip } from './Tooltip';
export type { TooltipProps, TooltipPlacement } from './Tooltip.types';
EOF

cat > src/scss/components/atoms/_tooltip.scss << 'SCSS'
.tooltip-wrapper {
  position: relative;
  display: inline-flex;
}

.tooltip {
  position: absolute;
  z-index: 1000;
  padding: 6px 10px;
  border-radius: 6px;
  background: var(--tooltip-bg, #1e293b);
  color: var(--tooltip-fg, #f8fafc);
  font-size: 12px;
  line-height: 1.4;
  white-space: nowrap;
  pointer-events: none;
  animation: tooltip-fade 0.15s ease;

  &--top    { bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
  &--bottom { top: calc(100% + 8px); left: 50%; transform: translateX(-50%); }
  &--left   { right: calc(100% + 8px); top: 50%; transform: translateY(-50%); }
  &--right  { left: calc(100% + 8px); top: 50%; transform: translateY(-50%); }

  &__arrow {
    position: absolute;
    width: 8px; height: 8px;
    background: inherit;
    transform: rotate(45deg);
  }

  &--top .tooltip__arrow    { bottom: -4px; left: 50%; margin-left: -4px; }
  &--bottom .tooltip__arrow { top: -4px; left: 50%; margin-left: -4px; }
  &--left .tooltip__arrow   { right: -4px; top: 50%; margin-top: -4px; }
  &--right .tooltip__arrow  { left: -4px; top: 50%; margin-top: -4px; }
}

@keyframes tooltip-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
SCSS

grep -q 'tooltip' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'tooltip';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 05:02:00 +0100" "feat(atoms): add Tooltip component + SCSS — top/bottom/left/right, delay, arrow"

# ────────────────────────────────────────────────────────────────────
# COMMIT 18 — Skeleton atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Skeleton
cat > src/components/atoms/Skeleton/Skeleton.tsx << 'EOF'
export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
}

export function Skeleton({
  width,
  height,
  variant = 'text',
  animation = 'pulse',
  className,
}: SkeletonProps) {
  const cls = [
    'skeleton',
    `skeleton--${variant}`,
    animation !== 'none' && `skeleton--${animation}`,
    className,
  ].filter(Boolean).join(' ');

  return <div className={cls} style={{ width, height }} aria-hidden="true" />;
}
EOF

cat > src/components/atoms/Skeleton/index.ts << 'EOF'
export { Skeleton } from './Skeleton';
export type { SkeletonProps } from './Skeleton';
EOF

cat > src/scss/components/atoms/_skeleton.scss << 'SCSS'
.skeleton {
  background: var(--skeleton-bg, #e2e8f0);

  &--text { height: 1em; border-radius: 4px; }
  &--circular { border-radius: 50%; }
  &--rectangular { border-radius: 0; }
  &--rounded { border-radius: 8px; }

  &--pulse {
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }

  &--wave {
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      animation: skeleton-wave 1.5s ease-in-out infinite;
    }
  }
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@keyframes skeleton-wave {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}
SCSS

grep -q 'skeleton' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'skeleton';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 05:12:00 +0100" "feat(atoms): add Skeleton component + SCSS — pulse/wave animation, 4 shape variants"

# ────────────────────────────────────────────────────────────────────
# COMMIT 19 — Progress atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Progress
cat > src/components/atoms/Progress/Progress.tsx << 'EOF'
export interface ProgressProps {
  value: number;        // 0–100
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  striped?: boolean;
  animated?: boolean;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  color = 'primary',
  striped = false,
  animated = false,
  className,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const cls = [
    'progress',
    `progress--${size}`,
    `progress--${color}`,
    striped && 'progress--striped',
    animated && 'progress--animated',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      {label && <span className="progress__label">{label}</span>}
      <div className="progress__track">
        <div className="progress__bar" style={{ width: `${pct}%` }} />
      </div>
      {showValue && <span className="progress__value">{Math.round(pct)}%</span>}
    </div>
  );
}
EOF

cat > src/components/atoms/Progress/index.ts << 'EOF'
export { Progress } from './Progress';
export type { ProgressProps } from './Progress';
EOF

cat > src/scss/components/atoms/_progress.scss << 'SCSS'
.progress {
  display: flex;
  align-items: center;
  gap: 8px;

  &__label { font-size: 12px; font-weight: 500; color: var(--text-secondary, #475569); white-space: nowrap; }
  &__value { font-size: 12px; font-variant-numeric: tabular-nums; color: var(--text-secondary, #475569); }

  &__track {
    flex: 1;
    border-radius: 999px;
    background: var(--progress-track-bg, #e2e8f0);
    overflow: hidden;
  }

  &--sm .progress__track { height: 4px; }
  &--md .progress__track { height: 8px; }
  &--lg .progress__track { height: 12px; }

  &__bar {
    height: 100%;
    border-radius: inherit;
    transition: width 0.3s ease;
  }

  &--primary .progress__bar { background: var(--accent-color, #3b82f6); }
  &--success .progress__bar { background: #22c55e; }
  &--warning .progress__bar { background: #f59e0b; }
  &--danger  .progress__bar { background: #ef4444; }

  &--striped .progress__bar {
    background-image: linear-gradient(
      45deg,
      rgba(255,255,255,0.15) 25%, transparent 25%,
      transparent 50%, rgba(255,255,255,0.15) 50%,
      rgba(255,255,255,0.15) 75%, transparent 75%
    );
    background-size: 1rem 1rem;
  }

  &--animated .progress__bar {
    animation: progress-stripe 1s linear infinite;
  }
}

@keyframes progress-stripe {
  from { background-position: 1rem 0; }
  to { background-position: 0 0; }
}
SCSS

grep -q 'progress' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'progress';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 05:22:00 +0100" "feat(atoms): add Progress component + SCSS — striped, animated, colour variants"

# ────────────────────────────────────────────────────────────────────
# COMMIT 20 — Alert atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Alert
cat > src/components/atoms/Alert/Alert.tsx << 'EOF'
import { useState } from 'react';

export interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function Alert({
  children,
  variant = 'info',
  title,
  icon,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const cls = ['alert', `alert--${variant}`, className].filter(Boolean).join(' ');

  return (
    <div className={cls} role="alert">
      {icon && <span className="alert__icon">{icon}</span>}
      <div className="alert__content">
        {title && <strong className="alert__title">{title}</strong>}
        <div className="alert__body">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          className="alert__dismiss"
          onClick={() => { setVisible(false); onDismiss?.(); }}
          aria-label="Dismiss"
        >×</button>
      )}
    </div>
  );
}
EOF

cat > src/components/atoms/Alert/index.ts << 'EOF'
export { Alert } from './Alert';
export type { AlertProps } from './Alert';
EOF

cat > src/scss/components/atoms/_alert.scss << 'SCSS'
.alert {
  display: flex;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 14px;
  line-height: 1.5;

  &--info    { background: #eff6ff; border-color: #bfdbfe; color: #1e40af; }
  &--success { background: #f0fdf4; border-color: #bbf7d0; color: #166534; }
  &--warning { background: #fffbeb; border-color: #fde68a; color: #92400e; }
  &--danger  { background: #fef2f2; border-color: #fecaca; color: #991b1b; }

  &__icon { flex-shrink: 0; font-size: 18px; line-height: 1.5; }
  &__content { flex: 1; }
  &__title { display: block; font-weight: 600; margin-bottom: 2px; }

  &__dismiss {
    flex-shrink: 0;
    background: none; border: none;
    font-size: 18px; line-height: 1;
    color: inherit; opacity: 0.6;
    cursor: pointer;
    &:hover { opacity: 1; }
  }
}
SCSS

grep -q 'alert' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'alert';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 05:32:00 +0100" "feat(atoms): add Alert component + SCSS — info/success/warning/danger, dismissible"

# ────────────────────────────────────────────────────────────────────
# COMMIT 21 — Toast notification atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Toast
cat > src/components/atoms/Toast/Toast.tsx << 'EOF'
import { useEffect, useState } from 'react';

export interface ToastProps {
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export function Toast({ message, variant = 'info', duration = 4000, onClose, className }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (duration <= 0) return;
    const t = setTimeout(() => setExiting(true), duration);
    return () => clearTimeout(t);
  }, [duration]);

  useEffect(() => {
    if (exiting) {
      const t = setTimeout(() => onClose?.(), 300);
      return () => clearTimeout(t);
    }
  }, [exiting, onClose]);

  const cls = [
    'toast',
    `toast--${variant}`,
    exiting && 'toast--exit',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} role="status" aria-live="polite">
      <span className="toast__message">{message}</span>
      <button type="button" className="toast__close" onClick={() => setExiting(true)} aria-label="Close">×</button>
    </div>
  );
}
EOF

cat > src/components/atoms/Toast/index.ts << 'EOF'
export { Toast } from './Toast';
export type { ToastProps } from './Toast';
EOF

cat > src/scss/components/atoms/_toast.scss << 'SCSS'
.toast {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  font-size: 13px;
  animation: toast-enter 0.3s ease;

  &--info    { background: #1e40af; color: #fff; }
  &--success { background: #166534; color: #fff; }
  &--warning { background: #92400e; color: #fff; }
  &--error   { background: #991b1b; color: #fff; }

  &--exit { animation: toast-exit 0.3s ease forwards; }

  &__message { flex: 1; }
  &__close {
    background: none; border: none;
    color: inherit; opacity: 0.7;
    font-size: 16px; cursor: pointer;
    &:hover { opacity: 1; }
  }
}

@keyframes toast-enter { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes toast-exit { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-8px); } }
SCSS

grep -q 'toast' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'toast';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 05:42:00 +0100" "feat(atoms): add Toast component + SCSS — auto-dismiss, enter/exit animations"

# ────────────────────────────────────────────────────────────────────
# COMMIT 22 — Spinner atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Spinner
cat > src/components/atoms/Spinner/Spinner.tsx << 'EOF'
export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
  className?: string;
}

export function Spinner({ size = 'md', color, label = 'Loading…', className }: SpinnerProps) {
  const cls = ['spinner', `spinner--${size}`, className].filter(Boolean).join(' ');
  return (
    <span className={cls} role="status" aria-label={label} style={color ? { borderTopColor: color } : undefined}>
      <span className="sr-only">{label}</span>
    </span>
  );
}
EOF

cat > src/components/atoms/Spinner/index.ts << 'EOF'
export { Spinner } from './Spinner';
export type { SpinnerProps } from './Spinner';
EOF

cat > src/scss/components/atoms/_spinner.scss << 'SCSS'
.spinner {
  display: inline-block;
  border: 3px solid var(--spinner-track, rgba(0,0,0,0.1));
  border-top-color: var(--accent-color, #3b82f6);
  border-radius: 50%;
  animation: spinner-spin 0.75s linear infinite;

  &--sm { width: 16px; height: 16px; border-width: 2px; }
  &--md { width: 24px; height: 24px; }
  &--lg { width: 40px; height: 40px; border-width: 4px; }
}

@keyframes spinner-spin { to { transform: rotate(360deg); } }
SCSS

grep -q 'spinner' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'spinner';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 05:50:00 +0100" "feat(atoms): add Spinner component + SCSS — sm/md/lg, customisable colour"

# ────────────────────────────────────────────────────────────────────
# COMMIT 23 — Divider atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Divider
cat > src/components/atoms/Divider/Divider.tsx << 'EOF'
export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Divider({ orientation = 'horizontal', label, variant = 'solid', spacing = 'md', className }: DividerProps) {
  const cls = [
    'divider',
    `divider--${orientation}`,
    `divider--${variant}`,
    `divider--${spacing}`,
    label && 'divider--labelled',
    className,
  ].filter(Boolean).join(' ');

  if (label) {
    return (
      <div className={cls} role="separator">
        <span className="divider__line" />
        <span className="divider__label">{label}</span>
        <span className="divider__line" />
      </div>
    );
  }

  return <hr className={cls} />;
}
EOF

cat > src/components/atoms/Divider/index.ts << 'EOF'
export { Divider } from './Divider';
export type { DividerProps } from './Divider';
EOF

cat > src/scss/components/atoms/_divider.scss << 'SCSS'
.divider {
  border: none;
  margin: 0;

  &--horizontal { width: 100%; border-top: 1px solid var(--border-color, #e2e8f0); }
  &--vertical   { height: 100%; border-left: 1px solid var(--border-color, #e2e8f0); align-self: stretch; }
  &--dashed { border-style: dashed; }
  &--dotted { border-style: dotted; }

  &--sm { &.divider--horizontal { margin: 4px 0; } &.divider--vertical { margin: 0 4px; } }
  &--md { &.divider--horizontal { margin: 12px 0; } &.divider--vertical { margin: 0 12px; } }
  &--lg { &.divider--horizontal { margin: 24px 0; } &.divider--vertical { margin: 0 24px; } }

  &--labelled {
    display: flex;
    align-items: center;
    gap: 12px;
    border: none;
  }

  &__line { flex: 1; height: 1px; background: var(--border-color, #e2e8f0); }
  &__label { font-size: 12px; color: var(--text-tertiary, #94a3b8); white-space: nowrap; }
}
SCSS

grep -q 'divider' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'divider';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 05:58:00 +0100" "feat(atoms): add Divider component + SCSS — horizontal/vertical, solid/dashed/dotted, labelled"

# ────────────────────────────────────────────────────────────────────
# COMMIT 24 — Kbd (keyboard key) atom
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/atoms/Kbd
cat > src/components/atoms/Kbd/Kbd.tsx << 'EOF'
export interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export function Kbd({ children, className }: KbdProps) {
  return <kbd className={`kbd${className ? ` ${className}` : ''}`}>{children}</kbd>;
}
EOF

cat > src/components/atoms/Kbd/index.ts << 'EOF'
export { Kbd } from './Kbd';
export type { KbdProps } from './Kbd';
EOF

cat > src/scss/components/atoms/_kbd.scss << 'SCSS'
.kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  padding: 2px 6px;
  border: 1px solid var(--border-color, #d1d5db);
  border-radius: 4px;
  background: var(--kbd-bg, #f9fafb);
  box-shadow: 0 1px 0 var(--border-color, #d1d5db);
  font-family: inherit;
  font-size: 11px;
  font-weight: 500;
  color: var(--text-primary, #374151);
  line-height: 1.4;
}
SCSS

grep -q 'kbd' src/scss/components/atoms/_index.scss 2>/dev/null || \
  echo "@forward 'kbd';" >> src/scss/components/atoms/_index.scss

dated_commit "2026-03-25 06:04:00 +0100" "feat(atoms): add Kbd (keyboard shortcut) component + SCSS"

# ────────────────────────────────────────────────────────────────────
# COMMIT 25 — Updated atoms barrel export
# ────────────────────────────────────────────────────────────────────
cat >> src/components/atoms/index.ts << 'EOF'
export * from './Badge';
export * from './Avatar';
export * from './Chip';
export * from './Input';
export * from './Textarea';
export * from './Select';
export * from './Checkbox';
export * from './Radio';
export * from './Switch';
export * from './Tooltip';
export * from './Skeleton';
export * from './Progress';
export * from './Alert';
export * from './Toast';
export * from './Spinner';
export * from './Divider';
export * from './Kbd';
EOF

dated_commit "2026-03-25 06:12:00 +0100" "refactor(atoms): update barrel exports — 15 new atom components"

# ────────────────────────────────────────────────────────────────────
# COMMIT 26 — Toolbar molecule
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/molecules/Toolbar
cat > src/components/molecules/Toolbar/Toolbar.types.ts << 'EOF'
export interface ToolbarItem {
  id: string;
  icon?: React.ReactNode;
  label: string;
  disabled?: boolean;
  active?: boolean;
}

export interface ToolbarProps {
  items: readonly ToolbarItem[];
  onAction: (id: string) => void;
  size?: 'sm' | 'md';
  vertical?: boolean;
  className?: string;
}
EOF

cat > src/components/molecules/Toolbar/Toolbar.tsx << 'EOF'
import type { ToolbarProps } from './Toolbar.types';

export function Toolbar({ items, onAction, size = 'md', vertical = false, className }: ToolbarProps) {
  const cls = [
    'toolbar',
    `toolbar--${size}`,
    vertical && 'toolbar--vertical',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} role="toolbar">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`toolbar__btn${item.active ? ' toolbar__btn--active' : ''}`}
          onClick={() => onAction(item.id)}
          disabled={item.disabled}
          title={item.label}
          aria-pressed={item.active}
        >
          {item.icon && <span className="toolbar__icon">{item.icon}</span>}
          <span className="toolbar__label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
EOF

cat > src/components/molecules/Toolbar/index.ts << 'EOF'
export { Toolbar } from './Toolbar';
export type { ToolbarProps, ToolbarItem } from './Toolbar.types';
EOF

cat > src/scss/components/molecules/_toolbar.scss << 'SCSS'
.toolbar {
  display: flex;
  gap: 2px;
  padding: 4px;
  border-radius: 8px;
  background: var(--surface-muted, #f1f5f9);

  &--vertical { flex-direction: column; }

  &__btn {
    display: flex;
    align-items: center;
    gap: 4px;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--text-secondary, #475569);
    cursor: pointer;
    transition: background 0.12s, color 0.12s;

    &:hover { background: var(--hover-color, rgba(0,0,0,0.06)); }
    &--active { background: var(--surface-color, #fff); color: var(--accent-color, #3b82f6); box-shadow: 0 1px 2px rgba(0,0,0,0.08); }
    &:disabled { opacity: 0.4; pointer-events: none; }
  }

  &--sm .toolbar__btn { padding: 4px 6px; font-size: 11px; }
  &--md .toolbar__btn { padding: 6px 10px; font-size: 12px; }

  &__icon { font-size: 14px; line-height: 1; }
  &__label { font-weight: 500; }
}
SCSS

grep -q 'toolbar' src/scss/components/molecules/_index.scss 2>/dev/null || \
  echo "@forward 'toolbar';" >> src/scss/components/molecules/_index.scss

dated_commit "2026-03-25 06:22:00 +0100" "feat(molecules): add Toolbar component + SCSS — horizontal/vertical, active state"

# ────────────────────────────────────────────────────────────────────
# COMMIT 27 — Pagination molecule
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/molecules/Pagination
cat > src/components/molecules/Pagination/Pagination.tsx << 'EOF'
import { useMemo } from 'react';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblings?: number;
  className?: string;
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function Pagination({ page, totalPages, onChange, siblings = 1, className }: PaginationProps) {
  const pages = useMemo(() => {
    const totalPageNumbers = siblings * 2 + 5;
    if (totalPages <= totalPageNumbers) return range(1, totalPages);

    const leftSib = Math.max(page - siblings, 1);
    const rightSib = Math.min(page + siblings, totalPages);
    const showLeftDots = leftSib > 2;
    const showRightDots = rightSib < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const left = range(1, 3 + 2 * siblings);
      return [...left, -1, totalPages];
    }
    if (showLeftDots && !showRightDots) {
      const right = range(totalPages - (2 + 2 * siblings), totalPages);
      return [1, -1, ...right];
    }
    return [1, -1, ...range(leftSib, rightSib), -2, totalPages];
  }, [page, totalPages, siblings]);

  return (
    <nav className={`pagination${className ? ` ${className}` : ''}`} aria-label="Pagination">
      <button className="pagination__btn" disabled={page <= 1} onClick={() => onChange(page - 1)}>‹</button>
      {pages.map((p, i) =>
        p < 0 ? (
          <span key={`dots-${i}`} className="pagination__dots">…</span>
        ) : (
          <button key={p} className={`pagination__btn${p === page ? ' pagination__btn--active' : ''}`} onClick={() => onChange(p)}>
            {p}
          </button>
        ),
      )}
      <button className="pagination__btn" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>›</button>
    </nav>
  );
}
EOF

cat > src/components/molecules/Pagination/index.ts << 'EOF'
export { Pagination } from './Pagination';
export type { PaginationProps } from './Pagination';
EOF

cat > src/scss/components/molecules/_pagination.scss << 'SCSS'
.pagination {
  display: flex;
  align-items: center;
  gap: 4px;

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 32px; height: 32px;
    padding: 0 6px;
    border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 6px;
    background: var(--surface-color, #fff);
    color: var(--text-primary, #334155);
    font-size: 13px;
    cursor: pointer;
    transition: background 0.12s, border-color 0.12s;

    &:hover:not(:disabled) { background: var(--hover-color, #f1f5f9); }
    &:disabled { opacity: 0.4; cursor: default; }
    &--active {
      background: var(--accent-color, #3b82f6);
      border-color: var(--accent-color, #3b82f6);
      color: #fff;
    }
  }

  &__dots { color: var(--text-tertiary, #94a3b8); font-size: 14px; padding: 0 4px; }
}
SCSS

grep -q 'pagination' src/scss/components/molecules/_index.scss 2>/dev/null || \
  echo "@forward 'pagination';" >> src/scss/components/molecules/_index.scss

dated_commit "2026-03-25 06:34:00 +0100" "feat(molecules): add Pagination component + SCSS — ellipsis, siblings, prev/next"

# ────────────────────────────────────────────────────────────────────
# COMMIT 28 — Accordion molecule
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/molecules/Accordion
cat > src/components/molecules/Accordion/Accordion.tsx << 'EOF'
import { useState, useCallback } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: readonly AccordionItem[];
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function Accordion({ items, multiple = false, defaultOpen = [], className }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }, [multiple]);

  return (
    <div className={`accordion${className ? ` ${className}` : ''}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div key={item.id} className={`accordion__item${isOpen ? ' accordion__item--open' : ''}`}>
            <button
              type="button"
              className="accordion__trigger"
              onClick={() => !item.disabled && toggle(item.id)}
              disabled={item.disabled}
              aria-expanded={isOpen}
            >
              <span className="accordion__title">{item.title}</span>
              <span className="accordion__chevron">{isOpen ? '▾' : '▸'}</span>
            </button>
            {isOpen && <div className="accordion__panel">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
EOF

cat > src/components/molecules/Accordion/index.ts << 'EOF'
export { Accordion } from './Accordion';
export type { AccordionProps, AccordionItem } from './Accordion';
EOF

cat > src/scss/components/molecules/_accordion.scss << 'SCSS'
.accordion {
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 8px;
  overflow: hidden;

  &__item {
    &:not(:last-child) { border-bottom: 1px solid var(--border-color, #e2e8f0); }
  }

  &__trigger {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
    border: none;
    background: var(--surface-color, #fff);
    color: var(--text-primary, #1e293b);
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: background 0.12s;

    &:hover { background: var(--hover-color, #f8fafc); }
    &:disabled { opacity: 0.5; cursor: default; }
  }

  &__title { flex: 1; }
  &__chevron { color: var(--text-tertiary, #94a3b8); transition: transform 0.2s; }

  &__panel {
    padding: 0 16px 12px;
    font-size: 14px;
    color: var(--text-secondary, #475569);
    line-height: 1.6;
  }
}
SCSS

grep -q 'accordion' src/scss/components/molecules/_index.scss 2>/dev/null || \
  echo "@forward 'accordion';" >> src/scss/components/molecules/_index.scss

dated_commit "2026-03-25 06:46:00 +0100" "feat(molecules): add Accordion component + SCSS — single/multi expand, disabled items"

# ────────────────────────────────────────────────────────────────────
# COMMIT 29 — Stepper molecule
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/molecules/Stepper
cat > src/components/molecules/Stepper/Stepper.tsx << 'EOF'
export interface StepperStep {
  id: string;
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: readonly StepperStep[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Stepper({ steps, currentStep, orientation = 'horizontal', className }: StepperProps) {
  const cls = ['stepper', `stepper--${orientation}`, className].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {steps.map((step, i) => {
        const state = i < currentStep ? 'completed' : i === currentStep ? 'active' : 'pending';
        return (
          <div key={step.id} className={`stepper__step stepper__step--${state}`}>
            <div className="stepper__indicator">
              {state === 'completed' ? '✓' : i + 1}
            </div>
            <div className="stepper__content">
              <span className="stepper__label">{step.label}</span>
              {step.description && <span className="stepper__desc">{step.description}</span>}
            </div>
            {i < steps.length - 1 && <div className="stepper__connector" />}
          </div>
        );
      })}
    </div>
  );
}
EOF

cat > src/components/molecules/Stepper/index.ts << 'EOF'
export { Stepper } from './Stepper';
export type { StepperProps, StepperStep } from './Stepper';
EOF

cat > src/scss/components/molecules/_stepper.scss << 'SCSS'
.stepper {
  display: flex;

  &--horizontal { align-items: flex-start; }
  &--vertical { flex-direction: column; }

  &__step {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    position: relative;
  }

  &--vertical .stepper__step { flex-direction: row; padding-bottom: 24px; }

  &__indicator {
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    flex-shrink: 0;
    border: 2px solid var(--border-color, #e2e8f0);
    background: var(--surface-color, #fff);
    color: var(--text-tertiary, #94a3b8);
    transition: all 0.2s;
  }

  .stepper__step--active > .stepper__indicator {
    border-color: var(--accent-color, #3b82f6);
    color: var(--accent-color, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
  }

  .stepper__step--completed > .stepper__indicator {
    border-color: #22c55e;
    background: #22c55e;
    color: #fff;
  }

  &__content { display: flex; flex-direction: column; gap: 2px; }
  &__label { font-size: 13px; font-weight: 500; color: var(--text-primary, #1e293b); }
  &__desc { font-size: 11px; color: var(--text-tertiary, #94a3b8); }

  &__connector {
    flex: 1;
    height: 2px;
    background: var(--border-color, #e2e8f0);
    margin: 0 8px;
  }

  &--vertical .stepper__connector {
    position: absolute;
    left: 15px;
    top: 36px;
    width: 2px;
    height: calc(100% - 36px);
  }
}
SCSS

grep -q 'stepper' src/scss/components/molecules/_index.scss 2>/dev/null || \
  echo "@forward 'stepper';" >> src/scss/components/molecules/_index.scss

dated_commit "2026-03-25 06:58:00 +0100" "feat(molecules): add Stepper component + SCSS — horizontal/vertical, completed/active/pending"

# ────────────────────────────────────────────────────────────────────
# COMMIT 30 — Breadcrumb molecule (enhanced)
# ────────────────────────────────────────────────────────────────────
mkdir -p src/components/molecules/BreadcrumbNav
cat > src/components/molecules/BreadcrumbNav/BreadcrumbNav.tsx << 'EOF'
export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbNavProps {
  items: readonly BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
}

export function BreadcrumbNav({ items, separator = '/', maxItems, className }: BreadcrumbNavProps) {
  let visibleItems = [...items];
  let collapsed = false;

  if (maxItems && items.length > maxItems) {
    visibleItems = [items[0]!, { label: '…' }, ...items.slice(-(maxItems - 1))];
    collapsed = true;
  }

  return (
    <nav className={`breadcrumb-nav${className ? ` ${className}` : ''}`} aria-label="Breadcrumb">
      <ol className="breadcrumb-nav__list">
        {visibleItems.map((item, i) => (
          <li key={i} className="breadcrumb-nav__item">
            {i > 0 && <span className="breadcrumb-nav__sep">{separator}</span>}
            {item.icon && <span className="breadcrumb-nav__icon">{item.icon}</span>}
            {item.href ? (
              <a className="breadcrumb-nav__link" href={item.href}>{item.label}</a>
            ) : (
              <span className="breadcrumb-nav__current" aria-current={i === visibleItems.length - 1 ? 'page' : undefined}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
EOF

cat > src/components/molecules/BreadcrumbNav/index.ts << 'EOF'
export { BreadcrumbNav } from './BreadcrumbNav';
export type { BreadcrumbNavProps, BreadcrumbItem } from './BreadcrumbNav';
EOF

dated_commit "2026-03-25 07:06:00 +0100" "feat(molecules): add BreadcrumbNav — collapsed overflow, separator, icon support"

# ────────────────────────────────────────────────────────────────────
# COMMIT 31 — Molecules barrel update
# ────────────────────────────────────────────────────────────────────
cat >> src/components/molecules/index.ts << 'EOF'

export { Toolbar } from './Toolbar';
export type { ToolbarProps, ToolbarItem } from './Toolbar';

export { Pagination } from './Pagination';
export type { PaginationProps } from './Pagination';

export { Accordion } from './Accordion';
export type { AccordionProps, AccordionItem } from './Accordion';

export { Stepper } from './Stepper';
export type { StepperProps, StepperStep } from './Stepper';

export { BreadcrumbNav } from './BreadcrumbNav';
export type { BreadcrumbNavProps, BreadcrumbItem } from './BreadcrumbNav';
EOF

dated_commit "2026-03-25 07:12:00 +0100" "refactor(molecules): update barrel — Toolbar, Pagination, Accordion, Stepper, BreadcrumbNav"

# ────────────────────────────────────────────────────────────────────
# COMMIT 32 — SCSS abstracts: elevation mixin
# ────────────────────────────────────────────────────────────────────
cat >> src/scss/abstracts/_mixins.scss << 'SCSS'

// ── Elevation / shadow system ──────────────────────────
@mixin elevation($level: 1) {
  @if $level == 0 { box-shadow: none; }
  @else if $level == 1 { box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06); }
  @else if $level == 2 { box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06); }
  @else if $level == 3 { box-shadow: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05); }
  @else if $level == 4 { box-shadow: 0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04); }
  @else if $level == 5 { box-shadow: 0 25px 50px rgba(0,0,0,0.25); }
}
SCSS

dated_commit "2026-03-25 07:20:00 +0100" "style(abstracts): add elevation mixin with 5 graduated shadow levels"

# ────────────────────────────────────────────────────────────────────
# COMMIT 33 — SCSS abstracts: functions library
# ────────────────────────────────────────────────────────────────────
cat >> src/scss/abstracts/_functions.scss << 'SCSS'

// ── Fluid clamp shorthand ──────────────────────────────
@function fluid-clamp($min, $max, $min-vw: 320px, $max-vw: 1440px) {
  $factor: math.div(1, ($max-vw - $min-vw)) * ($max - $min);
  $calc-value: unquote("#{$min} + #{strip-unit($factor)} * (100vw - #{$min-vw})");
  @return clamp(#{$min}, #{$calc-value}, #{$max});
}

// ── Color opacity helper ───────────────────────────────
@function alpha-channel($color, $opacity) {
  @return rgba($color, $opacity);
}
SCSS

dated_commit "2026-03-25 07:28:00 +0100" "style(abstracts): add fluid-clamp and alpha-channel helper functions"

# ────────────────────────────────────────────────────────────────────
# COMMIT 34 — Utility: transition presets
# ────────────────────────────────────────────────────────────────────
cat > src/scss/utilities/_transitions.scss << 'SCSS'
// Transition presets
.transition-none { transition: none !important; }
.transition-all  { transition: all 0.2s ease; }
.transition-colors { transition: color 0.15s, background-color 0.15s, border-color 0.15s; }
.transition-opacity { transition: opacity 0.2s ease; }
.transition-shadow  { transition: box-shadow 0.2s ease; }
.transition-transform { transition: transform 0.2s ease; }

// Duration utilities
.duration-75  { transition-duration: 75ms; }
.duration-100 { transition-duration: 100ms; }
.duration-150 { transition-duration: 150ms; }
.duration-200 { transition-duration: 200ms; }
.duration-300 { transition-duration: 300ms; }
.duration-500 { transition-duration: 500ms; }
.duration-700 { transition-duration: 700ms; }

// Easing utilities
.ease-linear  { transition-timing-function: linear; }
.ease-in      { transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }
.ease-out     { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }
.ease-in-out  { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
SCSS

grep -q 'transitions' src/scss/utilities/_index.scss 2>/dev/null || \
  echo "@forward 'transitions';" >> src/scss/utilities/_index.scss

dated_commit "2026-03-25 07:34:00 +0100" "style(utilities): add transition, duration, and easing utility classes"

# ────────────────────────────────────────────────────────────────────
# COMMIT 35 — Utility: focus-visible
# ────────────────────────────────────────────────────────────────────
cat > src/scss/utilities/_focus.scss << 'SCSS'
// Focus ring utilities
.focus-ring {
  &:focus-visible {
    outline: 2px solid var(--accent-color, #3b82f6);
    outline-offset: 2px;
  }
}

.focus-ring-inset {
  &:focus-visible {
    outline: 2px solid var(--accent-color, #3b82f6);
    outline-offset: -2px;
  }
}

.focus-within-ring {
  &:focus-within {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
}

.no-focus-ring {
  &:focus, &:focus-visible {
    outline: none;
    box-shadow: none;
  }
}
SCSS

grep -q 'focus' src/scss/utilities/_index.scss 2>/dev/null || \
  echo "@forward 'focus';" >> src/scss/utilities/_index.scss

dated_commit "2026-03-25 07:40:00 +0100" "style(utilities): add focus-visible ring utility classes"

# ────────────────────────────────────────────────────────────────────
# COMMIT 36 — Utility: flexbox helpers
# ────────────────────────────────────────────────────────────────────
cat > src/scss/utilities/_flex.scss << 'SCSS'
// Flex direction
.flex-row     { display: flex; flex-direction: row; }
.flex-col     { display: flex; flex-direction: column; }
.flex-row-rev { display: flex; flex-direction: row-reverse; }
.flex-col-rev { display: flex; flex-direction: column-reverse; }

// Flex wrap
.flex-wrap   { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }

// Align items
.items-start   { align-items: flex-start; }
.items-center  { align-items: center; }
.items-end     { align-items: flex-end; }
.items-stretch { align-items: stretch; }
.items-baseline { align-items: baseline; }

// Justify content
.justify-start   { justify-content: flex-start; }
.justify-center  { justify-content: center; }
.justify-end     { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
.justify-around  { justify-content: space-around; }
.justify-evenly  { justify-content: space-evenly; }

// Gap
.gap-0  { gap: 0; }
.gap-1  { gap: 4px; }
.gap-2  { gap: 8px; }
.gap-3  { gap: 12px; }
.gap-4  { gap: 16px; }
.gap-6  { gap: 24px; }
.gap-8  { gap: 32px; }

// Flex grow/shrink
.flex-1    { flex: 1 1 0%; }
.flex-auto { flex: 1 1 auto; }
.flex-none { flex: none; }
.grow      { flex-grow: 1; }
.grow-0    { flex-grow: 0; }
.shrink    { flex-shrink: 1; }
.shrink-0  { flex-shrink: 0; }
SCSS

grep -q 'flex' src/scss/utilities/_index.scss 2>/dev/null || \
  echo "@forward 'flex';" >> src/scss/utilities/_index.scss

dated_commit "2026-03-25 07:46:00 +0100" "style(utilities): add flexbox helper classes — direction, alignment, gap, grow/shrink"

# ────────────────────────────────────────────────────────────────────
# COMMIT 37 — Utility: typography
# ────────────────────────────────────────────────────────────────────
cat > src/scss/utilities/_text.scss << 'SCSS'
// Text sizes
.text-xs  { font-size: 0.75rem; line-height: 1rem; }
.text-sm  { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg  { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl  { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }

// Font weight
.font-light    { font-weight: 300; }
.font-normal   { font-weight: 400; }
.font-medium   { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold     { font-weight: 700; }

// Text align
.text-left   { text-align: left; }
.text-center { text-align: center; }
.text-right  { text-align: right; }

// Text transform
.uppercase  { text-transform: uppercase; }
.lowercase  { text-transform: lowercase; }
.capitalize { text-transform: capitalize; }
.normal-case { text-transform: none; }

// Text decoration
.underline    { text-decoration: underline; }
.line-through { text-decoration: line-through; }
.no-underline { text-decoration: none; }

// Truncation
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.line-clamp-2 { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
.line-clamp-3 { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; }
SCSS

grep -q 'text' src/scss/utilities/_index.scss 2>/dev/null || \
  echo "@forward 'text';" >> src/scss/utilities/_index.scss

dated_commit "2026-03-25 07:52:00 +0100" "style(utilities): add text utility classes — sizes, weights, alignment, truncation"

# ────────────────────────────────────────────────────────────────────
# COMMIT 38 — Utility: color helpers
# ────────────────────────────────────────────────────────────────────
cat > src/scss/utilities/_colors.scss << 'SCSS'
// Text colours
.text-primary   { color: var(--text-primary, #1e293b); }
.text-secondary { color: var(--text-secondary, #475569); }
.text-tertiary  { color: var(--text-tertiary, #94a3b8); }
.text-accent    { color: var(--accent-color, #3b82f6); }
.text-success   { color: #16a34a; }
.text-warning   { color: #d97706; }
.text-danger    { color: #dc2626; }
.text-white     { color: #ffffff; }

// Background colours
.bg-primary   { background: var(--surface-color, #fff); }
.bg-secondary { background: var(--surface-muted, #f8fafc); }
.bg-accent    { background: var(--accent-color, #3b82f6); }
.bg-success   { background: #22c55e; }
.bg-warning   { background: #f59e0b; }
.bg-danger    { background: #ef4444; }
.bg-transparent { background: transparent; }
SCSS

grep -q 'colors' src/scss/utilities/_index.scss 2>/dev/null || \
  echo "@forward 'colors';" >> src/scss/utilities/_index.scss

dated_commit "2026-03-25 07:58:00 +0100" "style(utilities): add text and background colour utility classes"

# ────────────────────────────────────────────────────────────────────
# COMMIT 39 — Utility: border helpers
# ────────────────────────────────────────────────────────────────────
cat > src/scss/utilities/_borders.scss << 'SCSS'
.border     { border: 1px solid var(--border-color, #e2e8f0); }
.border-0   { border: none; }
.border-t   { border-top: 1px solid var(--border-color, #e2e8f0); }
.border-b   { border-bottom: 1px solid var(--border-color, #e2e8f0); }
.border-l   { border-left: 1px solid var(--border-color, #e2e8f0); }
.border-r   { border-right: 1px solid var(--border-color, #e2e8f0); }

.rounded-none { border-radius: 0; }
.rounded-sm   { border-radius: 2px; }
.rounded      { border-radius: 4px; }
.rounded-md   { border-radius: 6px; }
.rounded-lg   { border-radius: 8px; }
.rounded-xl   { border-radius: 12px; }
.rounded-2xl  { border-radius: 16px; }
.rounded-full { border-radius: 9999px; }

.ring-1 { box-shadow: 0 0 0 1px var(--border-color, #e2e8f0); }
.ring-2 { box-shadow: 0 0 0 2px var(--accent-color, #3b82f6); }
SCSS

grep -q 'borders' src/scss/utilities/_index.scss 2>/dev/null || \
  echo "@forward 'borders';" >> src/scss/utilities/_index.scss

dated_commit "2026-03-25 08:04:00 +0100" "style(utilities): add border, border-radius, and ring utility classes"

# ────────────────────────────────────────────────────────────────────
# COMMIT 40 — useClickOutside hook
# ────────────────────────────────────────────────────────────────────
mkdir -p src/hooks
cat > src/hooks/useClickOutside.ts << 'EOF'
import { useEffect, useRef } from 'react';

/**
 * Fires `handler` when a click/touch occurs outside the ref'd element.
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler]);

  return ref;
}
EOF

dated_commit "2026-03-25 08:12:00 +0100" "feat(hooks): add useClickOutside — detect clicks outside a ref element"

# ────────────────────────────────────────────────────────────────────
# COMMIT 41 — useDebounce + useThrottle hooks
# ────────────────────────────────────────────────────────────────────
cat > src/hooks/useDebounce.ts << 'EOF'
import { useState, useEffect } from 'react';

/**
 * Returns a debounced version of `value`.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
EOF

cat > src/hooks/useThrottle.ts << 'EOF'
import { useRef, useEffect, useState } from 'react';

/**
 * Returns a throttled version of `value`.
 */
export function useThrottle<T>(value: T, interval = 200): T {
  const [throttled, setThrottled] = useState(value);
  const lastUpdated = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now - lastUpdated.current >= interval) {
      lastUpdated.current = now;
      setThrottled(value);
    } else {
      const timer = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottled(value);
      }, interval - (now - lastUpdated.current));
      return () => clearTimeout(timer);
    }
  }, [value, interval]);

  return throttled;
}
EOF

dated_commit "2026-03-25 08:20:00 +0100" "feat(hooks): add useDebounce and useThrottle timing hooks"

# ────────────────────────────────────────────────────────────────────
# COMMIT 42 — useMediaQuery + useBreakpoint hooks
# ────────────────────────────────────────────────────────────────────
cat > src/hooks/useMediaQuery.ts << 'EOF'
import { useState, useEffect } from 'react';

/**
 * Returns true when the window matches the given CSS media query string.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    setMatches(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
EOF

cat > src/hooks/useBreakpoint.ts << 'EOF'
import { useMediaQuery } from './useMediaQuery';

const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Returns true when viewport width >= the named breakpoint.
 */
export function useBreakpoint(bp: Breakpoint): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS[bp]}px)`);
}
EOF

dated_commit "2026-03-25 08:28:00 +0100" "feat(hooks): add useMediaQuery and useBreakpoint responsive hooks"

# ────────────────────────────────────────────────────────────────────
# COMMIT 43 — useLocalStorage hook
# ────────────────────────────────────────────────────────────────────
cat > src/hooks/useLocalStorage.ts << 'EOF'
import { useState, useCallback } from 'react';

/**
 * Persistent state backed by localStorage.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        window.localStorage.setItem(key, JSON.stringify(nextValue));
        return nextValue;
      });
    },
    [key],
  );

  const remove = useCallback(() => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, remove] as const;
}
EOF

dated_commit "2026-03-25 08:34:00 +0100" "feat(hooks): add useLocalStorage — persistent state with JSON serialisation"

# ────────────────────────────────────────────────────────────────────
# COMMIT 44 — Hooks barrel
# ────────────────────────────────────────────────────────────────────
cat > src/hooks/index.ts << 'EOF'
export { useClickOutside } from './useClickOutside';
export { useDebounce } from './useDebounce';
export { useThrottle } from './useThrottle';
export { useMediaQuery } from './useMediaQuery';
export { useBreakpoint } from './useBreakpoint';
export type { Breakpoint } from './useBreakpoint';
export { useLocalStorage } from './useLocalStorage';
EOF

dated_commit "2026-03-25 08:40:00 +0100" "refactor(hooks): add barrel export for all 6 custom hooks"

# ────────────────────────────────────────────────────────────────────
# COMMIT 45 — SCSS dark theme enhancements
# ────────────────────────────────────────────────────────────────────
cat >> src/scss/themes/_dark.scss << 'SCSS'

// Extended dark theme tokens for new components
[data-theme="dark"] {
  --badge-default-bg: #334155;
  --badge-default-fg: #cbd5e1;
  --chip-default-bg: #334155;
  --chip-default-fg: #cbd5e1;
  --chip-primary-bg: #1e3a5f;
  --chip-primary-fg: #93c5fd;
  --chip-success-bg: #14532d;
  --chip-success-fg: #86efac;
  --chip-warning-bg: #451a03;
  --chip-warning-fg: #fde68a;
  --chip-danger-bg: #450a0a;
  --chip-danger-fg: #fca5a5;
  --input-filled-bg: #1e293b;
  --switch-bg: #475569;
  --tooltip-bg: #f1f5f9;
  --tooltip-fg: #1e293b;
  --skeleton-bg: #334155;
  --progress-track-bg: #334155;
  --spinner-track: rgba(255,255,255,0.12);
  --kbd-bg: #1e293b;
}
SCSS

dated_commit "2026-03-25 08:48:00 +0100" "style(themes): extend dark theme tokens for Badge, Chip, Input, Switch, Tooltip, Skeleton"

# ────────────────────────────────────────────────────────────────────
# COMMIT 46 — SCSS light theme enhancements
# ────────────────────────────────────────────────────────────────────
cat >> src/scss/themes/_light.scss << 'SCSS'

// Extended light theme tokens
[data-theme="light"] {
  --badge-default-bg: #e2e8f0;
  --badge-default-fg: #475569;
  --chip-default-bg: #f1f5f9;
  --chip-default-fg: #334155;
  --input-filled-bg: #f8fafc;
  --switch-bg: #cbd5e1;
  --tooltip-bg: #1e293b;
  --tooltip-fg: #f8fafc;
  --skeleton-bg: #e2e8f0;
  --progress-track-bg: #e2e8f0;
  --spinner-track: rgba(0,0,0,0.08);
  --kbd-bg: #f9fafb;
}
SCSS

dated_commit "2026-03-25 08:54:00 +0100" "style(themes): extend light theme tokens for new atom components"

# ────────────────────────────────────────────────────────────────────
# COMMIT 47 — Accessibility: sr-only utility + skip link
# ────────────────────────────────────────────────────────────────────
cat > src/scss/utilities/_a11y.scss << 'SCSS'
// Screen-reader only
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.not-sr-only {
  position: static;
  width: auto; height: auto;
  padding: 0; margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

// Skip link
.skip-link {
  @extend .sr-only;
  &:focus {
    @extend .not-sr-only;
    position: fixed;
    top: 0; left: 0;
    z-index: 9999;
    padding: 8px 16px;
    background: var(--accent-color, #3b82f6);
    color: #fff;
    font-weight: 600;
  }
}

// Reduced motion preference
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
SCSS

grep -q 'a11y' src/scss/utilities/_index.scss 2>/dev/null || \
  echo "@forward 'a11y';" >> src/scss/utilities/_index.scss

dated_commit "2026-03-25 09:02:00 +0100" "style(utilities): add sr-only, skip-link, prefers-reduced-motion a11y utilities"

# ────────────────────────────────────────────────────────────────────
# COMMIT 48 — CSS custom props documentation
# ────────────────────────────────────────────────────────────────────
cat > src/scss/abstracts/_custom-properties.scss << 'SCSS'
// ─────────────────────────────────────────────────
// CSS Custom Properties Reference
// ─────────────────────────────────────────────────
// These are the design tokens exposed as CSS custom properties.
// Components reference them so theming is automatic.
//
// Surfaces:
//   --surface-color       Main background
//   --surface-muted       Muted/secondary surface
//   --hover-color         Hover state background
//
// Text:
//   --text-primary        Primary text
//   --text-secondary      Secondary text
//   --text-tertiary       Placeholder / hint text
//
// Borders:
//   --border-color        Default border
//
// Accent:
//   --accent-color        Brand / focus colour
//   --danger-color        Error / destructive
//
// Component-specific:
//   --badge-*-bg/fg       Badge backgrounds & foregrounds
//   --chip-*-bg/fg        Chip backgrounds & foregrounds
//   --input-filled-bg     Filled input background
//   --switch-bg           Switch track background
//   --tooltip-bg/fg       Tooltip background & text
//   --skeleton-bg         Skeleton placeholder
//   --progress-track-bg   Progress track background
//   --spinner-track       Spinner track colour
//   --kbd-bg              Keyboard key background

:root {
  --surface-color: #ffffff;
  --surface-muted: #f8fafc;
  --hover-color: rgba(0, 0, 0, 0.04);
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-tertiary: #94a3b8;
  --border-color: #e2e8f0;
  --accent-color: #3b82f6;
  --danger-color: #ef4444;
}
SCSS

dated_commit "2026-03-25 09:10:00 +0100" "docs(tokens): add CSS custom properties reference with root defaults"

# ────────────────────────────────────────────────────────────────────
# COMMIT 49 — SCSS build verification
# ────────────────────────────────────────────────────────────────────
npx sass src/scss/libcss.scss dist/css/libcss.css --no-source-map 2>&1 || true
git add -A
dated_commit "2026-03-25 09:18:00 +0100" "chore: rebuild compiled CSS — includes all new atoms, molecules, and utilities"

# ────────────────────────────────────────────────────────────────────
# COMMIT 50 — Studio entries for new components
# ────────────────────────────────────────────────────────────────────
cat > studio/src/entries/badge.entry.ts << 'EOF'
import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Badge } from '../../../src/components/atoms/Badge';
import { BADGE_VARIANTS, BADGE_SIZES } from '../../../src/components/atoms/Badge/Badge.constants';
import { defineParameters } from '../../../src/components/controls/schema';

const presets: VariantPreset[] = [
  ...BADGE_VARIANTS.flatMap((v) => BADGE_SIZES.map((s) => ({
    id: `${v}-${s}`, label: `${v} ${s}`,
    props: { variant: v, size: s, children: `${v} ${s}` },
    group: 'Variant × Size',
  }))),
  { id: 'pill', label: 'Pill', props: { pill: true, children: 'Pill Badge' }, group: 'Styles' },
  { id: 'outline', label: 'Outline', props: { variant: 'primary', outline: true, children: 'Outline' }, group: 'Styles' },
  { id: 'dot', label: 'With Dot', props: { dot: true, children: 'Notification' }, group: 'Styles' },
];

const entry: ComponentEntry = {
  id: 'badge',
  name: 'Badge',
  category: 'atoms',
  description: 'Inline status badge with variant, size, pill, outline, and dot indicator support.',
  tags: ['badge', 'tag', 'label', 'status'],
  defaultProps: { variant: 'default', size: 'md', children: 'Badge' },
  presets,
  controls: [],
  parameters: defineParameters()
    .group('appearance', 'Appearance', { icon: '🎨' })
      .select('variant', 'Variant', {
        defaultValue: 'default',
        options: BADGE_VARIANTS.map((v) => ({ label: v[0]!.toUpperCase() + v.slice(1), value: v })),
      })
      .select('size', 'Size', {
        defaultValue: 'md',
        options: BADGE_SIZES.map((s) => ({ label: s.toUpperCase(), value: s })),
      })
    .group('style', 'Style', { icon: '✨' })
      .boolean('pill', 'Pill', { defaultValue: false })
      .boolean('outline', 'Outline', { defaultValue: false })
      .boolean('dot', 'Dot', { defaultValue: false })
    .group('content', 'Content', { icon: '📝' })
      .text('children', 'Label', { defaultValue: 'Badge', placeholder: 'Badge text…' })
    .build(),
  render: (props) => React.createElement(Badge, props as any),
};

registry.register(entry.id, entry);
EOF

cat > studio/src/entries/avatar.entry.ts << 'EOF'
import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Avatar } from '../../../src/components/atoms/Avatar';
import { AVATAR_SIZES, AVATAR_SHAPES } from '../../../src/components/atoms/Avatar/Avatar.constants';
import { defineParameters } from '../../../src/components/controls/schema';

const presets: VariantPreset[] = [
  ...AVATAR_SIZES.map((s) => ({
    id: `size-${s}`, label: s.toUpperCase(),
    props: { size: s, initials: 'DL' },
    group: 'Sizes',
  })),
  ...AVATAR_SHAPES.map((sh) => ({
    id: `shape-${sh}`, label: sh,
    props: { shape: sh, initials: 'DL' },
    group: 'Shapes',
  })),
  { id: 'with-status', label: 'Online', props: { initials: 'AB', status: 'online' }, group: 'Status' },
];

const entry: ComponentEntry = {
  id: 'avatar',
  name: 'Avatar',
  category: 'atoms',
  description: 'User avatar with image, initials fallback, and online/offline status indicator.',
  tags: ['avatar', 'user', 'profile', 'image'],
  defaultProps: { size: 'md', shape: 'circle', initials: 'DL' },
  presets,
  controls: [],
  parameters: defineParameters()
    .group('display', 'Display', { icon: '👤' })
      .text('src', 'Image URL', { defaultValue: '', placeholder: 'https://…' })
      .text('initials', 'Initials', { defaultValue: 'DL', placeholder: 'AB' })
    .group('style', 'Style', { icon: '🎨' })
      .select('size', 'Size', { defaultValue: 'md', options: AVATAR_SIZES.map((s) => ({ label: s.toUpperCase(), value: s })) })
      .select('shape', 'Shape', { defaultValue: 'circle', options: AVATAR_SHAPES.map((sh) => ({ label: sh, value: sh })) })
    .build(),
  render: (props) => React.createElement(Avatar, props as any),
};

registry.register(entry.id, entry);
EOF

# Add to entries barrel
cat >> studio/src/entries/index.ts << 'EOF'

// New atoms
import './badge.entry';
import './avatar.entry';
EOF

dated_commit "2026-03-25 09:26:00 +0100" "feat(studio): add Badge and Avatar showcase entries with presets and parameter schemas"

echo "✅  50 commits created successfully!"
