import { useId } from 'react';
import { useLanguageSelector } from './useLanguageSelector';
import { LanguageOption } from './LanguageOption';
import type { LanguageSelectorProps } from './LanguageSelector.types';
import { cn } from '../../lib';

export function LanguageSelector<T extends string>({
  language,
  onLanguageChange,
  languages,
  id: providedId,
  className,
}: LanguageSelectorProps<T>) {
  const { isOpen, buttonRef, menuRef, toggleMenu, closeMenu } = useLanguageSelector();
  const autoId = useId();
  const componentId = providedId ?? autoId;

  const currentLanguage = languages.find((l) => l.code === language) ?? languages[0];
  if (!currentLanguage) return null;

  return (
    <div className={cn('prisma-language-selector', className)}>
      <button
        ref={buttonRef}
        id={componentId}
        className="prisma-language-selector__trigger"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <span className="prisma-language-selector__flag">{currentLanguage.flag}</span>
        <span className="prisma-language-selector__code">{currentLanguage.code}</span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="prisma-language-selector__dropdown"
          role="menu"
          aria-labelledby={componentId}
        >
          {languages.map((lang) => (
            <LanguageOption
              key={lang.code}
              lang={lang}
              isActive={lang.code === language}
              onSelect={(code) => {
                onLanguageChange(code);
                closeMenu();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
