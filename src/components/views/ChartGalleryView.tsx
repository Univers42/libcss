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
    <section className="gallery">
      <div className="gallery__header">
        <button
          type="button"
          className="gallery__back"
          onClick={onBack}
          aria-label="Back to overview"
        >
          ← Overview
        </button>
        <div className="gallery__title-group">
          <h1 className="gallery__title">{title}</h1>
          <p className="gallery__subtitle">{subtitle}</p>
        </div>
        <div className="gallery__stats">
          <span className="gallery__stat">
            <strong>{items.length}</strong> chart{items.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="gallery__grid">
        {items.map((item) => (
          <div key={item.id} className="gallery__card">
            <div className="gallery__card-chart">
              {renderChart(item.config)}
            </div>
            <div className="gallery__card-info">
              <h3 className="gallery__card-title">{item.title}</h3>
              <p className="gallery__card-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
