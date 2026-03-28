/**
 * @file backgroundEffects.ts
 * @description Background animation effect presets for CloudTerminal.
 *
 * Each effect is pure CSS — the component renders the right DOM
 * elements and a data attribute switches the keyframes / styles.
 */

export interface BackgroundEffect {
  /** Unique identifier */
  readonly id: string;
  /** Display name in the dropdown */
  readonly name: string;
  /** Short description */
  readonly description: string;
  /** Emoji/icon hint for the dropdown swatch */
  readonly icon: string;
  /** Number of particle elements to render */
  readonly particleCount: number;
}

export const BG_EFFECTS: readonly BackgroundEffect[] = [
  {
    id: 'none',
    name: 'None',
    description: 'No background animation',
    icon: '⊘',
    particleCount: 0,
  },
  {
    id: 'bubbles',
    name: 'Bubbles',
    description: 'Wobbling iridescent orbs with convection drift',
    icon: '◌',
    particleCount: 10,
  },
  {
    id: 'rain',
    name: 'Rain',
    description: 'Wind-angled streaks with depth parallax',
    icon: '⋮',
    particleCount: 14,
  },
  {
    id: 'fireflies',
    name: 'Fireflies',
    description: 'Bioluminescent hover-and-dart with pulsing glow',
    icon: '✦',
    particleCount: 10,
  },
  {
    id: 'aurora',
    name: 'Aurora',
    description: 'Undulating curtain ribbons with counter-flow',
    icon: '≋',
    particleCount: 5,
  },
  {
    id: 'snow',
    name: 'Snow',
    description: 'Tumbling flakes with wind gusts and depth layers',
    icon: '❄',
    particleCount: 12,
  },
  {
    id: 'embers',
    name: 'Embers',
    description: 'Spiraling incandescent sparks with rapid flicker',
    icon: '🔥',
    particleCount: 10,
  },
  {
    id: 'plasma',
    name: 'Plasma',
    description: 'Morphing organic blobs that drift and merge',
    icon: '🫧',
    particleCount: 6,
  },
] as const;

export type BackgroundEffectId = (typeof BG_EFFECTS)[number]['id'];

export function getBackgroundEffect(id: string): BackgroundEffect {
  return BG_EFFECTS.find((e) => e.id === id) ?? BG_EFFECTS[0];
}
