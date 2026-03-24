import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { SocialButton } from '../../../src/components';
import { GitHubIcon, GoogleIcon } from '../../../src/components';

const PROVIDER_ICONS: Record<string, React.FC<any>> = {
  github: GitHubIcon,
  google: GoogleIcon,
};

const PROVIDERS = ['github', 'google', 'azure'] as const;

const presets: VariantPreset[] = [
  ...PROVIDERS.map((p) => ({
    id: p, label: p[0]!.toUpperCase() + p.slice(1),
    props: { provider: p, label: `Continue with ${p[0]!.toUpperCase() + p.slice(1)}` },
    group: 'Providers',
  })),
  ...PROVIDERS.map((p) => ({
    id: `${p}-disabled`, label: `${p[0]!.toUpperCase() + p.slice(1)} Disabled`,
    props: { provider: p, label: `Continue with ${p[0]!.toUpperCase() + p.slice(1)}`, disabled: true },
    group: 'Disabled',
  })),
];

const entry: ComponentEntry = {
  id: 'social-button',
  name: 'Social Button',
  category: 'molecules',
  description: 'OAuth provider button with brand icon and label.',
  tags: ['social', 'oauth', 'login', 'github', 'google', 'azure'],
  defaultProps: {
    provider: 'github',
    label: 'GitHub',
    disabled: false,
  },
  variantDimensions: [
    { prop: 'provider', label: 'Provider', values: [...PROVIDERS] },
  ],
  presets,
  controls: [
    {
      key: 'provider',
      label: 'Provider',
      type: 'select',
      group: 'Content',
      defaultValue: 'github',
      options: [
        { label: 'GitHub', value: 'github' },
        { label: 'Google', value: 'google' },
        { label: 'Azure', value: 'azure' },
      ],
    },
    {
      key: 'label',
      label: 'Label',
      type: 'text',
      group: 'Content',
      defaultValue: 'GitHub',
    },
    {
      key: 'disabled',
      label: 'Disabled',
      type: 'boolean',
      group: 'State',
      defaultValue: false,
    },
  ],
  render: (props) => {
    const fp = props as any;
    const IconComp = PROVIDER_ICONS[fp.provider];
    const icon = IconComp ? React.createElement(IconComp, { size: 'sm' }) : null;
    return React.createElement(SocialButton, {
      provider: fp.provider,
      label: fp.label,
      icon,
    } as any);
  },
};

registry.register(entry.id, entry);
