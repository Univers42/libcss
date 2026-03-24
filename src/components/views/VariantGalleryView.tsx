/**
 * @file VariantGalleryView
 * @description Responsive gallery showing ALL variant presets of a component.
 * Each card renders the component with a specific preset configuration,
 * making it easy to see every visual state at a glance.
 *
 * Supports:
 * - Manual presets from entry.presets[]
 * - Auto-generated presets from entry.variantDimensions[]
 * - Grouped sections (e.g., "Variants × Sizes", "States")
 * - Click-through to playground with preset pre-loaded
 */

import { useMemo, useState } from 'react';
import type {
  ComponentCategory,
  ComponentEntry,
  VariantPreset,
  VariantDimensionDef,
} from '../../core/types';
import { CATEGORY_META } from '../../core/types';
import { registry } from '../../core/registry';
import { ExplorerBreadcrumb } from '../explorer/Breadcrumb';

export interface VariantGalleryViewProps {
  componentId: string;
  category: ComponentCategory;
  onBack: () => void;
  onOpenPlayground: (presetProps?: Record<string, unknown>) => void;
}

/** Auto-generate presets from variantDimensions via cartesian product. */
function generatePresetsFromDimensions(entry: ComponentEntry): VariantPreset[] {
  const dims = entry.variantDimensions;
  if (!dims || dims.length === 0) return [];

  function cartesian(
    dimensions: readonly VariantDimensionDef[],
    idx: number,
  ): Record<string, string>[] {
    if (idx >= dimensions.length) return [{}];
    const dim = dimensions[idx]!;
    const rest = cartesian(dimensions, idx + 1);
    const result: Record<string, string>[] = [];
    for (const value of dim.values) {
      for (const combo of rest) {
        result.push({ [dim.prop]: value, ...combo });
      }
    }
    return result;
  }

  const combos = cartesian(dims, 0);
  return combos.map((combo) => {
    const parts = Object.values(combo);
    return {
      id: parts.join('-'),
      label: parts.map((v) => v.charAt(0).toUpperCase() + v.slice(1)).join(' · '),
      props: combo,
      group: dims.map((d) => d.label ?? d.prop).join(' × '),
    };
  });
}

/** Group presets by their group field. */
function groupPresets(
  presets: readonly VariantPreset[],
): Map<string, VariantPreset[]> {
  const groups = new Map<string, VariantPreset[]>();
  for (const p of presets) {
    const key = p.group ?? 'All Variants';
    const list = groups.get(key) ?? [];
    list.push(p);
    groups.set(key, list);
  }
  return groups;
}

type CanvasBg = 'dark' | 'light' | 'checker';

export function VariantGalleryView({
  componentId,
  category,
  onBack,
  onOpenPlayground,
}: VariantGalleryViewProps) {
  const entry = registry.get(componentId) as ComponentEntry | undefined;
  const meta = CATEGORY_META[category];
  const [canvasBg, setCanvasBg] = useState<CanvasBg>('dark');

  const allPresets = useMemo<VariantPreset[]>(() => {
    if (!entry) return [];
    const manual = entry.presets ?? [];
    const auto = entry.variantDimensions
      ? generatePresetsFromDimensions(entry)
      : [];
    return manual.length > 0
      ? [...manual, ...auto.filter((a) => !manual.some((m) => m.id === a.id))]
      : auto;
  }, [entry]);

  const grouped = useMemo(() => groupPresets(allPresets), [allPresets]);

  if (!entry) {
    return (
      <section className="variant-gallery">
        <p>Component not found.</p>
        <button type="button" onClick={onBack}>
          ← Back
        </button>
      </section>
    );
  }

  const totalPresets = allPresets.length;

  return (
    <section className="variant-gallery">
      <ExplorerBreadcrumb
        segments={[
          { label: 'Catalog', onClick: onBack },
          { label: meta.label, onClick: onBack },
          { label: entry.name },
        ]}
      />

      {/* Header */}
      <div className="variant-gallery__header">
        <div className="variant-gallery__info">
          <h1 className="variant-gallery__title">{entry.name}</h1>
          <p className="variant-gallery__desc">{entry.description}</p>
          <div className="variant-gallery__meta">
            <span className="variant-gallery__badge">{meta.label}</span>
            <span className="variant-gallery__count">
              {totalPresets} variant{totalPresets !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="variant-gallery__controls">
          <div className="variant-gallery__bg-toggle">
            {(['dark', 'light', 'checker'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                className={`variant-gallery__bg-btn${canvasBg === mode ? ' variant-gallery__bg-btn--active' : ''}`}
                onClick={() => setCanvasBg(mode)}
              >
                {mode === 'dark' ? '🌙' : mode === 'light' ? '☀' : '▦'}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="variant-gallery__playground-btn"
            onClick={() => onOpenPlayground()}
          >
            ⚡ Playground
          </button>
        </div>
      </div>

      {/* Preset Groups */}
      {[...grouped.entries()].map(([groupName, presets]) => (
        <div key={groupName} className="variant-gallery__group">
          <h2 className="variant-gallery__group-title">
            {groupName}
            <span className="variant-gallery__group-count">{presets.length}</span>
          </h2>

          <div className="variant-gallery__grid">
            {presets.map((preset) => {
              const mergedProps = { ...entry.defaultProps, ...preset.props };
              return (
                <button
                  key={preset.id}
                  type="button"
                  className="variant-gallery__card"
                  onClick={() => onOpenPlayground(preset.props)}
                  title={`Open ${preset.label} in playground`}
                >
                  <div
                    className={`variant-gallery__card-canvas variant-gallery__card-canvas--${canvasBg}`}
                  >
                    <div className="variant-gallery__card-render">
                      {entry.render(mergedProps)}
                    </div>
                  </div>
                  <div className="variant-gallery__card-label">
                    <span className="variant-gallery__card-name">
                      {preset.label}
                    </span>
                    {preset.description && (
                      <span className="variant-gallery__card-desc">
                        {preset.description}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {totalPresets === 0 && (
        <div className="variant-gallery__empty">
          <p>No variant presets defined for this component.</p>
          <button
            type="button"
            className="variant-gallery__playground-btn"
            onClick={() => onOpenPlayground()}
          >
            Open in Playground →
          </button>
        </div>
      )}
    </section>
  );
}
