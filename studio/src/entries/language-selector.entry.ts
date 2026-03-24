import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { LanguageSelector } from '../../../src/components';

const DEMO_LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
] as const;

const presets: VariantPreset[] = DEMO_LANGUAGES.map((l) => ({
  id: l.code, label: `${l.flag} ${l.label}`,
  props: { language: l.code },
  group: 'Languages',
}));

const entry: ComponentEntry = {
  id: 'language-selector',
  name: 'Language Selector',
  category: 'molecules',
  description: 'Dropdown language picker with keyboard navigation and flags.',
  tags: ['language', 'i18n', 'selector', 'dropdown', 'locale'],
  defaultProps: {
    language: 'en',
  },
  presets,
  controls: [
    {
      key: 'language',
      label: 'Language',
      type: 'select',
      group: 'State',
      defaultValue: 'en',
      options: DEMO_LANGUAGES.map((l) => ({
        label: `${l.flag} ${l.label}`,
        value: l.code,
      })),
    },
  ],
  render: (props) => {
    return React.createElement(LanguageSelector, {
      language: (props.language as string) ?? 'en',
      languages: DEMO_LANGUAGES as any,
      onLanguageChange: () => {},
    });
  },
};

registry.register(entry.id, entry);
