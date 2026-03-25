/**
 * @file VariantGrid
 * @description Generic variant grid that renders all combinations of a
 * component's variant dimensions. Works with any component that has
 * constants arrays discovered by the parser.
 *
 * Usage:
 *   <VariantGrid
 *     component={Button}
 *     dimensions={[
 *       { prop: 'variant', values: BUTTON_VARIANTS },
 *       { prop: 'size', values: BUTTON_SIZES },
 *     ]}
 *     baseProps={{ children: 'Click me' }}
 *   />
 */

import React, { type ComponentType, type ReactElement } from 'react';

// ─── Types ─────────────────────────────────────────────

export interface VariantDimension {
  /** Prop name on the target component. */
  readonly prop: string;
  /** Display label (defaults to prop name). */
  readonly label?: string;
  /** Possible values for this dimension. */
  readonly values: readonly string[];
}

export interface VariantGridProps {
  /** The component to render in each cell. */
  readonly component: ComponentType<Record<string, unknown>>;
  /** The variant dimensions to iterate over (max 2 for grid layout). */
  readonly dimensions: readonly VariantDimension[];
  /** Base props applied to every instance. */
  readonly baseProps?: Record<string, unknown>;
  /** Optional title above the grid. */
  readonly title?: string;
}

// ─── Helpers ───────────────────────────────────────────

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Generate the cartesian product of dimension values.
 * For 2 dimensions, returns a 2D grid. For 1, a single row.
 * For 3+, flattens to a list.
 */
function cartesian(dimensions: readonly VariantDimension[]): Record<string, string>[] {
  if (dimensions.length === 0) return [{}];
  const [first, ...rest] = dimensions;
  const restCombinations = cartesian(rest);
  const result: Record<string, string>[] = [];
  for (const value of first.values) {
    for (const combo of restCombinations) {
      result.push({ [first.prop]: value, ...combo });
    }
  }
  return result;
}

// ─── Component ─────────────────────────────────────────

export function VariantGrid({
  component: Component,
  dimensions,
  baseProps = {},
  title,
}: VariantGridProps): ReactElement {
  // Special case: 2D grid (most common — variant × size)
  if (dimensions.length === 2) {
    const [rowDim, colDim] = dimensions;
    return (
      <div className="variant-grid">
        {title && <h3 className="variant-grid__title">{title}</h3>}
        <div className="variant-grid__table" role="table">
          {/* Header */}
          <div className="variant-grid__row variant-grid__row--header" role="row">
            <div className="variant-grid__cell variant-grid__cell--label" role="columnheader">
              {capitalize(rowDim.label ?? rowDim.prop)} ↓ /{' '}
              {capitalize(colDim.label ?? colDim.prop)} →
            </div>
            {colDim.values.map((col) => (
              <div
                key={col}
                className="variant-grid__cell variant-grid__cell--header"
                role="columnheader"
              >
                {col}
              </div>
            ))}
          </div>
          {/* Body */}
          {rowDim.values.map((row) => (
            <div key={row} className="variant-grid__row" role="row">
              <div className="variant-grid__cell variant-grid__cell--label" role="rowheader">
                {row}
              </div>
              {colDim.values.map((col) => (
                <div key={`${row}-${col}`} className="variant-grid__cell" role="cell">
                  <Component {...baseProps} {...{ [rowDim.prop]: row, [colDim.prop]: col }} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── 1D or 3D+ fallback: flat list ────────────────────
  const combos = cartesian(dimensions);
  return (
    <div className="variant-grid">
      {title && <h3 className="variant-grid__title">{title}</h3>}
      <div className="variant-grid__list">
        {combos.map((combo, i) => {
          const label = Object.entries(combo)
            .map(([k, v]) => `${k}=${v}`)
            .join(', ');
          return (
            <div key={i} className="variant-grid__item">
              <span className="variant-grid__item-label">{label}</span>
              <Component {...baseProps} {...combo} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
