/**
 * Button — Component Definition
 *
 * Defines the "button" component type once:
 *   - schema  → what can be edited (groups + controls)
 *   - defaults → extracted automatically from the schema, nested
 *   - render  → how to visualise any nested props map
 *
 * Data format (nested, state-based):
 * ```json
 * {
 *   "name": "Primary",
 *   "props": { "label": "Click me", "icon": "", "iconPosition": "left" },
 *   "style": {
 *     "base": { "backgroundColor": "#3b82f6", "padding": { "top": 10 }, ... },
 *     "hover": { "backgroundColor": "#2563eb", "transform": { ... } },
 *     "active": { ... },
 *     "disabled": { "opacity": 0.5, "cursor": "not-allowed" }
 *   }
 * }
 * ```
 *
 * Philosophy: **scrub > range > number > select.**
 * Selects only when the domain is a finite set of keywords.
 */

import { defineParameters } from '@libcss/components/controls';
import { defineComponentType } from '@libcss/core';
import { StylableButton } from '../StylableButton';

// ── Shorthand ──
const SO = (value, label) => ({ value, label });

// ═══════════════════════════════════════════════════════
// Schema — nested keys, state-based styling
// ═══════════════════════════════════════════════════════

const buttonSchema = defineParameters()

  // ── Content ──────────────────────────────────────
  .group('content', 'Content')
    .text('name',                 'Name',      { defaultValue: 'New Button', placeholder: 'Variant name' })
    .text('props.label',          'Label',     { defaultValue: 'Click me',  placeholder: 'Button text' })
    .text('props.icon',           'Icon',      { defaultValue: '',           placeholder: 'emoji / symbol' })
    .select('props.iconPosition', 'Icon Side', {
      defaultValue: 'left',
      options: [SO('left', 'Left'), SO('right', 'Right')],
    })

  // ── Colors ───────────────────────────────────────
  .group('colors', 'Colors')
    .color('style.base.backgroundColor', 'Background', { defaultValue: '#3b82f6' })
    .color('style.base.color',           'Text',       { defaultValue: '#ffffff' })
    .text('style.base.gradient',         'Gradient',   { defaultValue: '', placeholder: 'linear-gradient(135deg, #667eea, #764ba2)' })

  // ── Typography ───────────────────────────────────
  .group('typography', 'Typography', { collapsed: true })
    .scrub('style.base.fontSize',       'Size',            { defaultValue: 14, min: 8,  max: 72, step: 1,   unit: 'px' })
    .scrub('style.base.fontWeight',     'Weight',          { defaultValue: 600, min: 100, max: 900, step: 100 })
    .select('style.base.textTransform', 'Transform', {
      defaultValue: 'none',
      options: [SO('none','None'), SO('uppercase','UPPER'), SO('lowercase','lower'), SO('capitalize','Title')],
    })
    .scrub('style.base.letterSpacing',  'Tracking',        { defaultValue: 0, min: -2, max: 12, step: 0.25, unit: 'px', sensitivity: 0.5 })
    .scrub('style.base.lineHeight',     'Leading',         { defaultValue: 1.2, min: 0.8, max: 3, step: 0.05, sensitivity: 0.3 })

  // ── Spacing ──────────────────────────────────────
  .group('spacing', 'Spacing', { collapsed: true })
    .scrub('style.base.padding.top',     'Top',       { defaultValue: 10, min: 0, max: 60, step: 1, unit: 'px' })
    .scrub('style.base.padding.right',   'Right',     { defaultValue: 24, min: 0, max: 80, step: 1, unit: 'px' })
    .scrub('style.base.padding.bottom',  'Bottom',    { defaultValue: 10, min: 0, max: 60, step: 1, unit: 'px' })
    .scrub('style.base.padding.left',    'Left',      { defaultValue: 24, min: 0, max: 80, step: 1, unit: 'px' })
    .scrub('style.base.minWidth',        'Min Width', { defaultValue: 0,  min: 0, max: 500, step: 5, unit: 'px' })
    .scrub('style.base.gap',             'Gap',       { defaultValue: 8,  min: 0, max: 24, step: 1, unit: 'px' })

  // ── Border ───────────────────────────────────────
  .group('border', 'Border', { collapsed: true })
    .scrub('style.base.border.radius',   'Radius',    { defaultValue: 8, min: 0, max: 100, step: 1, unit: 'px' })
    .scrub('style.base.border.width',    'Width',     { defaultValue: 0, min: 0, max: 12,  step: 1, unit: 'px' })
    .color('style.base.border.color',    'Color',     { defaultValue: '#3b82f6' })
    .select('style.base.border.style',   'Style', {
      defaultValue: 'solid',
      options: [SO('none','None'), SO('solid','Solid'), SO('dashed','Dashed'), SO('dotted','Dotted'), SO('double','Double')],
    })

  // ── Shadow ───────────────────────────────────────
  .group('shadow', 'Shadow', { collapsed: true })
    .scrub('style.base.shadow.x',        'X',         { defaultValue: 0, min: -30, max: 30, step: 1, unit: 'px' })
    .scrub('style.base.shadow.y',        'Y',         { defaultValue: 4, min: -30, max: 30, step: 1, unit: 'px' })
    .scrub('style.base.shadow.blur',     'Blur',      { defaultValue: 6, min: 0,   max: 60, step: 1, unit: 'px' })
    .scrub('style.base.shadow.spread',   'Spread',    { defaultValue: 0, min: -20, max: 20, step: 1, unit: 'px' })
    .color('style.base.shadow.color',    'Color',     { defaultValue: 'rgba(0,0,0,0.1)' })

  // ── Transform ────────────────────────────────────
  .group('transform', 'Transform')
    .scrub('style.base.transform.scale',    'Scale',       { defaultValue: 1,    min: 0.2, max: 3,   step: 0.01, sensitivity: 0.2 })
    .scrub('style.base.transform.rotate',   'Rotate',      { defaultValue: 0,    min: -360, max: 360, step: 1, unit: '°' })
    .scrub('style.base.transform.skewX',    'Skew X',      { defaultValue: 0,    min: -45, max: 45, step: 0.5, unit: '°', sensitivity: 0.5 })
    .scrub('style.base.transform.skewY',    'Skew Y',      { defaultValue: 0,    min: -45, max: 45, step: 0.5, unit: '°', sensitivity: 0.5 })
    .scrub('style.base.transform.translateX','Move X',      { defaultValue: 0,   min: -100, max: 100, step: 1, unit: 'px' })
    .scrub('style.base.transform.translateY','Move Y',      { defaultValue: 0,   min: -100, max: 100, step: 1, unit: 'px' })

  // ── Transition ───────────────────────────────────
  .group('transition', 'Transition')
    .select('style.base.transition.property', 'Property', {
      defaultValue: 'all',
      options: [SO('all','All'), SO('transform','Transform'), SO('background-color','Background'), SO('color','Color'), SO('box-shadow','Shadow'), SO('opacity','Opacity'), SO('border','Border')],
    })
    .scrub('style.base.transition.duration',  'Duration',  { defaultValue: 0.2, min: 0, max: 3, step: 0.05, unit: 's', sensitivity: 0.3 })
    .select('style.base.transition.timing',   'Easing', {
      defaultValue: 'ease',
      options: [
        SO('ease','Ease'), SO('ease-in','Ease In'), SO('ease-out','Ease Out'),
        SO('ease-in-out','Ease In Out'), SO('linear','Linear'),
        SO('cubic-bezier(0.68,-0.55,0.27,1.55)','Bounce'),
        SO('cubic-bezier(0.22,1,0.36,1)','Smooth'),
        SO('cubic-bezier(0.25,0.46,0.45,0.94)','Decelerate'),
      ],
    })
    .scrub('style.base.transition.delay',     'Delay',     { defaultValue: 0, min: 0, max: 2, step: 0.05, unit: 's', sensitivity: 0.3 })

  // ── Hover ────────────────────────────────────────
  .group('hover', 'Hover')
    .color('style.hover.backgroundColor',     'Background',  { defaultValue: '#2563eb' })
    .color('style.hover.color',               'Text',        { defaultValue: '#ffffff' })
    .color('style.hover.borderColor',         'Border',      { defaultValue: '#2563eb' })
    .scrub('style.hover.transform.scale',     'Scale',       { defaultValue: 1.04, min: 0.5, max: 2,   step: 0.01, sensitivity: 0.2 })
    .scrub('style.hover.transform.rotate',    'Rotate',      { defaultValue: 0,    min: -45, max: 45,  step: 1, unit: '°' })
    .scrub('style.hover.transform.translateY','Lift',        { defaultValue: -2,   min: -20, max: 20,  step: 1, unit: 'px' })
    .scrub('style.hover.shadow.x',            'Sh X',        { defaultValue: 0,    min: -20, max: 20,  step: 1, unit: 'px' })
    .scrub('style.hover.shadow.y',            'Sh Y',        { defaultValue: 10,   min: -20, max: 40,  step: 1, unit: 'px' })
    .scrub('style.hover.shadow.blur',         'Sh Blur',     { defaultValue: 28,   min: 0,   max: 60,  step: 1, unit: 'px' })
    .scrub('style.hover.shadow.spread',       'Sh Spread',   { defaultValue: -2,   min: -20, max: 20,  step: 1, unit: 'px' })
    .color('style.hover.shadow.color',        'Sh Color',    { defaultValue: 'rgba(0,0,0,0.25)' })
    .scrub('style.hover.opacity',             'Opacity',     { defaultValue: 1,    min: 0, max: 1, step: 0.05, sensitivity: 0.3 })

  // ── Active ───────────────────────────────────────
  .group('active', 'Active', { collapsed: true })
    .scrub('style.active.transform.scale',     'Scale',       { defaultValue: 1,   min: 0.8, max: 1.2, step: 0.01, sensitivity: 0.2 })
    .scrub('style.active.transform.translateY','Push',        { defaultValue: 0,   min: 0, max: 10, step: 1, unit: 'px' })
    .scrub('style.active.shadow.blur',         'Sh Blur',     { defaultValue: 6,   min: 0, max: 30, step: 1, unit: 'px' })
    .color('style.active.shadow.color',        'Sh Color',    { defaultValue: 'rgba(0,0,0,0.15)' })

  // ── Disabled ─────────────────────────────────────
  .group('disabled', 'Disabled', { collapsed: true })
    .scrub('style.disabled.opacity', 'Opacity',    { defaultValue: 0.5, min: 0, max: 1, step: 0.05, sensitivity: 0.3 })
    .select('style.disabled.cursor', 'Cursor', {
      defaultValue: 'not-allowed',
      options: [SO('not-allowed','Not Allowed'), SO('default','Default'), SO('pointer','Pointer')],
    })
    .boolean('style.disabled.grayscale', 'Grayscale', { defaultValue: false })

  // ── Advanced ─────────────────────────────────────
  .group('advanced', 'Advanced', { collapsed: true })
    .scrub('style.base.opacity', 'Opacity', { defaultValue: 1, min: 0, max: 1, step: 0.05, sensitivity: 0.3 })
    .select('style.base.cursor', 'Cursor', {
      defaultValue: 'pointer',
      options: [SO('pointer','Pointer'), SO('default','Default'), SO('not-allowed','Disabled')],
    })
    .select('style.base.overflow', 'Overflow', {
      defaultValue: 'hidden',
      options: [SO('visible','Visible'), SO('hidden','Hidden')],
    })
  .build();

// ═══════════════════════════════════════════════════════
// Component Type (registered globally)
// ═══════════════════════════════════════════════════════

export const buttonDefinition = defineComponentType({
  type: 'button',
  label: 'Button',
  icon: '',
  description: 'Interactive button — any color, shape, shadow, hover effect.',
  schema: buttonSchema,
  render: (props) => <StylableButton config={props} />,
});
