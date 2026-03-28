/**
 * @file animations.ts
 * @description Animation presets for CloudTerminal using libcss animation classes.
 *
 * Maps terminal UI elements to lcss-anim-* utility classes from the
 * Prismatica animation library. Fully configurable per-element.
 */

export const ANIM_CLASSES = [
  'lcss-anim-pulse',
  'lcss-anim-glow',
  'lcss-anim-shake',
  'lcss-anim-ripple',
  'lcss-anim-morph',
  'lcss-anim-float',
  'lcss-anim-jelly',
  'lcss-anim-slide-up',
  'lcss-anim-slide-down',
  'lcss-anim-slide-left',
  'lcss-anim-slide-right',
  'lcss-anim-flip-x',
  'lcss-anim-flip-y',
  'lcss-anim-neon',
  'lcss-anim-glitch',
  'lcss-anim-bounce-in',
  'lcss-anim-gradient',
  'lcss-anim-shimmer',
  'lcss-anim-spin',
  'lcss-anim-rubber-band',
  'lcss-anim-explode',
  'lcss-anim-typewriter',
  'lcss-anim-particle-burst',
] as const;

export type AnimClassName = (typeof ANIM_CLASSES)[number];

/** Speed modifiers */
export type AnimSpeed =
  | 'lcss-anim--fast'
  | 'lcss-anim--normal'
  | 'lcss-anim--slow'
  | 'lcss-anim--slower';

/** Iteration modifiers */
export type AnimLoop = 'lcss-anim--once' | 'lcss-anim--loop' | 'lcss-anim--twice';

export interface ElementAnimation {
  /** The lcss-anim-* class to apply */
  readonly className: AnimClassName;
  /** Optional speed modifier */
  readonly speed?: AnimSpeed;
  /** Optional iteration modifier */
  readonly loop?: AnimLoop;
  /** Optional delay modifier */
  readonly delay?:
    | 'lcss-anim--delay-1'
    | 'lcss-anim--delay-2'
    | 'lcss-anim--delay-3'
    | 'lcss-anim--delay-4';
}

/** Full animation preset mapping elements to animations */
export interface AnimationPreset {
  readonly id: string;
  readonly name: string;
  /** Nav rail entry animation */
  readonly navRail?: ElementAnimation;
  /** Header entry animation */
  readonly header?: ElementAnimation;
  /** Card entry animation */
  readonly card?: ElementAnimation;
  /** Each new pane entry */
  readonly paneEnter?: ElementAnimation;
  /** Tab switching */
  readonly tabSwitch?: ElementAnimation;
  /** Status bar */
  readonly statusBar?: ElementAnimation;
  /** Background orbs */
  readonly background?: ElementAnimation;
}

export const ANIM_PRESET_NONE: AnimationPreset = {
  id: 'none',
  name: 'No Animations',
};

export const ANIM_PRESET_SMOOTH: AnimationPreset = {
  id: 'smooth',
  name: 'Smooth',
  navRail: { className: 'lcss-anim-slide-left', speed: 'lcss-anim--fast' },
  header: { className: 'lcss-anim-slide-down', speed: 'lcss-anim--fast' },
  card: { className: 'lcss-anim-slide-up', speed: 'lcss-anim--normal' },
  paneEnter: { className: 'lcss-anim-slide-up', speed: 'lcss-anim--fast' },
  statusBar: {
    className: 'lcss-anim-slide-up',
    speed: 'lcss-anim--fast',
    delay: 'lcss-anim--delay-2',
  },
};

export const ANIM_PRESET_BOUNCY: AnimationPreset = {
  id: 'bouncy',
  name: 'Bouncy',
  navRail: { className: 'lcss-anim-bounce-in', speed: 'lcss-anim--fast' },
  header: {
    className: 'lcss-anim-bounce-in',
    speed: 'lcss-anim--fast',
    delay: 'lcss-anim--delay-1',
  },
  card: { className: 'lcss-anim-bounce-in', speed: 'lcss-anim--normal' },
  paneEnter: { className: 'lcss-anim-jelly', speed: 'lcss-anim--fast' },
  statusBar: {
    className: 'lcss-anim-slide-up',
    speed: 'lcss-anim--fast',
    delay: 'lcss-anim--delay-2',
  },
};

export const ANIM_PRESET_CYBER: AnimationPreset = {
  id: 'cyber',
  name: 'Cyber',
  navRail: { className: 'lcss-anim-glitch', speed: 'lcss-anim--fast' },
  header: { className: 'lcss-anim-shimmer' },
  card: { className: 'lcss-anim-slide-up', speed: 'lcss-anim--fast' },
  paneEnter: { className: 'lcss-anim-glitch', speed: 'lcss-anim--fast' },
  background: { className: 'lcss-anim-gradient', loop: 'lcss-anim--loop' },
};

export const ANIM_PRESET_ELEGANT: AnimationPreset = {
  id: 'elegant',
  name: 'Elegant',
  navRail: { className: 'lcss-anim-slide-right', speed: 'lcss-anim--slow' },
  header: { className: 'lcss-anim-slide-down', speed: 'lcss-anim--slow' },
  card: { className: 'lcss-anim-slide-up', speed: 'lcss-anim--slow' },
  paneEnter: { className: 'lcss-anim-slide-up', speed: 'lcss-anim--normal' },
  statusBar: {
    className: 'lcss-anim-slide-up',
    speed: 'lcss-anim--slow',
    delay: 'lcss-anim--delay-3',
  },
};

export const ANIMATION_PRESETS: readonly AnimationPreset[] = [
  ANIM_PRESET_NONE,
  ANIM_PRESET_SMOOTH,
  ANIM_PRESET_BOUNCY,
  ANIM_PRESET_CYBER,
  ANIM_PRESET_ELEGANT,
] as const;

/** Build a className string from an ElementAnimation */
export function animClasses(anim: ElementAnimation | undefined): string {
  if (!anim) return '';
  const parts: string[] = [anim.className];
  if (anim.speed) parts.push(anim.speed);
  if (anim.loop) parts.push(anim.loop);
  if (anim.delay) parts.push(anim.delay);
  return parts.join(' ');
}
