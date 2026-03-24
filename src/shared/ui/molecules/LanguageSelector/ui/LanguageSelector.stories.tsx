import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';

const meta: Meta<typeof LanguageSelector> = {
  title: 'Shared/Molecules/LanguageSelector',
  component: LanguageSelector,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LanguageSelector>;

const languages = [
  { code: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
];

export const Default: Story = {
  render: (args) => {
    const [lang, setLang] = useState('EN');
    return (
      <div style={{ height: '200px' }}>
        <LanguageSelector
          {...args}
          language={lang}
          onLanguageChange={setLang}
          languages={languages}
        />
      </div>
    );
  },
};
