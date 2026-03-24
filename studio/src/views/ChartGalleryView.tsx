/**
 * @file ChartGalleryView
 * @description Showcase of all 10 chart types rendered in a responsive grid.
 * Each chart card uses realistic fake data with advanced config options
 * (aggregation, groupBy, cumulative, reference lines, curve types, etc.).
 */

import { Chart } from '../../../src/components/layout';
import { GALLERY_ITEMS } from '../entries/chart-gallery-data';

interface ChartGalleryViewProps {
  onBack: () => void;
}

export function ChartGalleryView({ onBack }: ChartGalleryViewProps) {
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
          <h1 className="gallery__title">Chart Gallery</h1>
          <p className="gallery__subtitle">
            All 10 chart types rendered with realistic datasets — aggregation,
            grouping, cumulative, reference lines, and more.
          </p>
        </div>
        <div className="gallery__stats">
          <span className="gallery__stat">
            <strong>10</strong> chart types
          </span>
          <span className="gallery__stat-sep">·</span>
          <span className="gallery__stat">
            <strong>8</strong> palettes used
          </span>
          <span className="gallery__stat-sep">·</span>
          <span className="gallery__stat">
            <strong>6</strong> advanced features
          </span>
        </div>
      </div>

      <div className="gallery__grid">
        {GALLERY_ITEMS.map((item) => (
          <div key={item.id} className="gallery__card">
            <div className="gallery__card-chart">
              <Chart config={item.config} />
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
