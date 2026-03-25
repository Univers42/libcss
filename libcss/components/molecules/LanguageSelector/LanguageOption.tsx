import type { JSX } from 'react';
import type { Language } from './LanguageSelector.types';
import { cn } from '../../lib';

interface LanguageOptionProps<T extends string> {
  lang: Language<T>;
  isActive: boolean;
  onSelect: (code: T) => void;
}

export function LanguageOption<T extends string>({
  lang,
  isActive,
  onSelect,
}: LanguageOptionProps<T>): JSX.Element {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        'prisma-language-selector__option',
        isActive && 'prisma-language-selector__option--active',
      )}
      onClick={() => onSelect(lang.code)}
      aria-current={isActive ? 'true' : undefined}
    >
      <span className="prisma-language-selector__option-flag" aria-hidden="true">
        {lang.flag}
      </span>
      <span className="prisma-language-selector__option-label">{lang.label}</span>
      <span className="prisma-language-selector__option-code">{lang.code}</span>
    </button>
  );
}
