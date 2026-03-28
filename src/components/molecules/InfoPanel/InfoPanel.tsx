import type { JSX } from 'react';
import { InfoFeatureItem } from './InfoFeatureItem';
import { InfoStatItem } from './InfoStatItem';
import type { InfoPanelProps } from './InfoPanel.types';
import { cn } from '../../lib';

export function InfoPanel({
  title,
  subtitle,
  features = [],
  stats = [],
  className,
}: InfoPanelProps): JSX.Element {
  return (
    <div className={cn('prisma-info-panel', className)}>
      <div className="prisma-info-panel__header">
        <h1 className="prisma-info-panel__title">{title}</h1>
        <p className="prisma-info-panel__subtitle">{subtitle}</p>

        {features.length > 0 && (
          <div className="prisma-info-panel__features">
            {features.map((feature, index) => (
              <InfoFeatureItem key={`feature-${index}`} feature={feature} />
            ))}
          </div>
        )}
      </div>

      {stats.length > 0 && (
        <div className="prisma-info-panel__footer">
          <div className="prisma-info-panel__divider" />
          <div className="prisma-info-panel__stats">
            {stats.map((stat, index) => (
              <InfoStatItem key={`stat-${index}`} stat={stat} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
