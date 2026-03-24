/**
 * @file ChartGalleryView
 * @description Showcase of chart types rendered in a responsive grid.
 * Accepts gallery items as props so it's data-agnostic and reusable.
 */

import React from 'react';

export interface ChartGalleryItem {
  /** Unique key. */
  id: string;
  /** Display title. */
  title: string;
  /** Short description. */
  description: string;
  /** Chart configuration object — rendered by the Chart component. */
  config: unknown;
}

export interface ChartGalleryViewProps {
  /** Gallery items to render (chart configs + labels). */
  items: readonly ChartGalleryItem[];
  /** Render function that turns a config into a chart — keeps this view
   *  decoupled from the Chart component implementation. */
  renderChart: (config: unknown) => React.ReactNode;
  onBack: () => void;
  /** Optional title override. */
  title?: string;
  /** Optional subtitle override. */
  subtitle?: string;
}

export function ChartGalleryView({
  items,
  renderChart,
  onBack,
  title = 'Chart Gallery',
  subtitle = 'All chart types rendered with realistic datasets — aggregation, grouping, cumulative, reference lines, and more.',
}: ChartGalleryViewProps) {
  return (
    <section className="shell-gallery">
      <div className="shell-gallery__header">
        <button
          type="button"
          className="shell-gallery__back"
          onClick={onBack}
          aria-label="Back to overview"
        >
          ← Overview
        </button>
        <div className="shell-shell-gallery__title-group">
          <h1 className="shell-gallery__title">{title}</h1>
          <p className="shell-gallery__subtitle">{subtitle}</p>
        </div>
        <div className="shell-shell-gallery__stats">
          <span className="shell-gallery__stat">
            <strong>{items.length}</strong> chart{items.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="shell-gallery__grid">
        {items.map((item) => (
          <div key={item.id} className="shell-gallery__card">
            <div className="shell-shell-gallery__card-chart">
              {renderChart(item.config)}
            </div>
            <div className="shell-shell-gallery__card-info">
              <h3 className="shell-shell-gallery__card-title">{item.title}</h3>
              <p className="shell-shell-gallery__card-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
