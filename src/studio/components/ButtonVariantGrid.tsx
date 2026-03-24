/**
 * @file ButtonVariantGrid
 * @description Renders every Button variant × size × state combination in a
 * grid layout. Used in the studio playground to visualize the full button
 * design space at a glance.
 *
 * The grid is driven entirely by the constants exported from the Button
 * component — adding a new variant or size to Button.constants.ts
 * automatically adds a new row/column here.
 */

import React from 'react';
import { Button } from '../../components/atoms/Button';
import {
  BUTTON_VARIANTS,
  BUTTON_SIZES,
} from '../../components/atoms/Button/Button.constants';
import type {
  ButtonVariant,
  ButtonSize,
} from '../../components/atoms/Button/Button.types';

// ─── State Presets ─────────────────────────────────────

interface StatePreset {
  readonly label: string;
  readonly props: Record<string, unknown>;
}

const STATE_PRESETS: readonly StatePreset[] = [
  { label: 'Default', props: {} },
  { label: 'Loading', props: { isLoading: true } },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Full Width', props: { fullWidth: true } },
  { label: 'With Icons', props: { leftIcon: '←', rightIcon: '→' } },
];

// ─── Polymorphic Presets ───────────────────────────────

interface PolymorphicPreset {
  readonly label: string;
  readonly element: string;
  readonly props: Record<string, unknown>;
}

const POLYMORPHIC_PRESETS: readonly PolymorphicPreset[] = [
  { label: '<button>', element: 'button', props: { type: 'button' } },
  { label: '<a href>', element: 'anchor', props: { href: '#demo' } },
  { label: '<Link to>', element: 'router', props: { to: '/demo' } },
];

// ─── Grid Component ────────────────────────────────────

export interface ButtonVariantGridProps {
  /** Show state variations (loading, disabled, etc). Default: true */
  readonly showStates?: boolean;
  /** Show polymorphic element variants (button/a/Link). Default: true */
  readonly showPolymorphic?: boolean;
  /** Custom label text for the buttons. Default: 'Button' */
  readonly label?: string;
}

export function ButtonVariantGrid({
  showStates = true,
  showPolymorphic = true,
  label = 'Button',
}: ButtonVariantGridProps) {
  return (
    <div className="button-variant-grid">
      {/* ── Variant × Size Matrix ──────────────── */}
      <section className="button-variant-grid__section">
        <h3 className="button-variant-grid__title">
          Variants × Sizes ({BUTTON_VARIANTS.length} × {BUTTON_SIZES.length})
        </h3>
        <div className="button-variant-grid__table" role="table">
          {/* Header row */}
          <div className="button-variant-grid__row button-variant-grid__row--header" role="row">
            <div className="button-variant-grid__cell button-variant-grid__cell--label" role="columnheader" />
            {BUTTON_SIZES.map((size) => (
              <div
                key={size}
                className="button-variant-grid__cell button-variant-grid__cell--header"
                role="columnheader"
              >
                {size}
              </div>
            ))}
          </div>
          {/* Variant rows */}
          {BUTTON_VARIANTS.map((variant) => (
            <div key={variant} className="button-variant-grid__row" role="row">
              <div className="button-variant-grid__cell button-variant-grid__cell--label" role="rowheader">
                {variant}
              </div>
              {BUTTON_SIZES.map((size) => (
                <div key={`${variant}-${size}`} className="button-variant-grid__cell" role="cell">
                  <Button variant={variant as ButtonVariant} size={size as ButtonSize}>
                    {label}
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── State Variations ────────────────────── */}
      {showStates && (
        <section className="button-variant-grid__section">
          <h3 className="button-variant-grid__title">State Variations</h3>
          <div className="button-variant-grid__table" role="table">
            <div className="button-variant-grid__row button-variant-grid__row--header" role="row">
              <div className="button-variant-grid__cell button-variant-grid__cell--label" role="columnheader" />
              {STATE_PRESETS.map((preset) => (
                <div
                  key={preset.label}
                  className="button-variant-grid__cell button-variant-grid__cell--header"
                  role="columnheader"
                >
                  {preset.label}
                </div>
              ))}
            </div>
            {BUTTON_VARIANTS.map((variant) => (
              <div key={variant} className="button-variant-grid__row" role="row">
                <div className="button-variant-grid__cell button-variant-grid__cell--label" role="rowheader">
                  {variant}
                </div>
                {STATE_PRESETS.map((preset) => (
                  <div
                    key={`${variant}-${preset.label}`}
                    className="button-variant-grid__cell"
                    role="cell"
                  >
                    <Button
                      variant={variant as ButtonVariant}
                      {...preset.props}
                    >
                      {label}
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Polymorphic Rendering ───────────────── */}
      {showPolymorphic && (
        <section className="button-variant-grid__section">
          <h3 className="button-variant-grid__title">Polymorphic Rendering</h3>
          <p className="button-variant-grid__desc">
            Same visual output — three different underlying HTML elements.
          </p>
          <div className="button-variant-grid__row button-variant-grid__row--poly">
            {POLYMORPHIC_PRESETS.map((preset) => (
              <div
                key={preset.element}
                className="button-variant-grid__poly-item"
              >
                <span className="button-variant-grid__poly-label">
                  {preset.label}
                </span>
                <Button variant="primary" {...preset.props}>
                  {label}
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
