import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { ColorPicker } from '../../../src/components/molecules/ColorPicker';
import { ALL_MODES } from '../../../src/components/molecules/ColorPicker/model/ColorPicker.types';
import { defineParameters } from '../../../src/components/controls/schema';

/* ---------- Presets ---------- */
const presets: VariantPreset[] = [
  {
    id: 'default',
    label: 'Default (All modes)',
    props: { value: '#3b82f6' },
    group: 'Configuration',
  },
  {
    id: 'map-only',
    label: 'Map Only',
    props: { value: '#ef4444', modes: ['map'] },
    group: 'Configuration',
  },
  {
    id: 'sliders-only',
    label: 'RGB + HSL + CMYK',
    props: { value: '#22c55e', modes: ['rgb', 'hsl', 'cmyk'] },
    group: 'Configuration',
  },
  {
    id: 'wheel',
    label: 'Wheel + Map',
    props: { value: '#8b5cf6', modes: ['wheel', 'map'] },
    group: 'Configuration',
  },
  {
    id: 'gradient',
    label: 'Gradient Editor',
    props: { value: '#f97316', modes: ['gradient'], defaultMode: 'gradient' },
    group: 'Configuration',
  },
  {
    id: 'no-alpha',
    label: 'No Alpha',
    props: { value: '#06b6d4', showAlpha: false },
    group: 'Options',
  },
  {
    id: 'headless',
    label: 'Headless (no window)',
    props: { value: '#ec4899', windowed: false, defaultMode: 'map' },
    group: 'Options',
  },
  {
    id: 'narrow',
    label: 'Narrow (280px)',
    props: { value: '#eab308', width: 280 },
    group: 'Layout',
  },
  {
    id: 'wide',
    label: 'Wide (500px)',
    props: { value: '#14b8a6', width: 500 },
    group: 'Layout',
  },
];

const entry: ComponentEntry = {
  id: 'color-picker',
  name: 'Color Picker',
  category: 'molecules',
  description:
    'Professional multi-mode colour picker with 6 views: Saturation Map, Colour Wheel, RGB Sliders, HSL Sliders, CMYK Sliders, and Gradient Editor. Housed in a WindowPanel with tabs.',
  tags: ['color', 'picker', 'rgb', 'hsl', 'cmyk', 'gradient', 'wheel', 'palette'],
  defaultProps: {
    value: '#3b82f6',
    showAlpha: true,
    windowed: true,
    width: 380,
  },
  presets,
  controls: [],
  parameters: defineParameters()
    .group('value', 'Value', { icon: '🎨' })
      .color('value', 'Colour', { defaultValue: '#3b82f6' })
    .group('modes', 'Modes', { icon: '🔀' })
      .multiselect('modes', 'Active Modes', {
        defaultValue: [...ALL_MODES],
        options: ALL_MODES.map((m) => ({ label: m[0]!.toUpperCase() + m.slice(1), value: m })),
      })
    .group('options', 'Options', { icon: '⚙️' })
      .toggle('showAlpha', 'Alpha Channel', { defaultValue: true, onLabel: 'On', offLabel: 'Off' })
      .toggle('windowed', 'Window Chrome', { defaultValue: true, onLabel: 'On', offLabel: 'Off' })
    .group('layout', 'Layout', { icon: '📐', style: 'compact' })
      .number('width', 'Width', { defaultValue: 380, min: 200, max: 800, step: 10 })
    .build(),
  render: (props) => React.createElement(ColorPicker, props as any),
};

registry.register(entry.id, entry);
