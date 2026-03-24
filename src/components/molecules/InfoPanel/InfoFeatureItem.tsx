import type { InfoFeature } from './InfoPanel.types';
import { DEFAULT_CHECK_ICON_SIZE } from './InfoPanel.constants';

export function InfoFeatureItem({ feature }: { feature: InfoFeature }) {
  return (
    <div className="prisma-info-panel__feature">
      <div className="prisma-info-panel__feature-icon">
        {feature.icon ?? (
          <svg
            width={DEFAULT_CHECK_ICON_SIZE}
            height={DEFAULT_CHECK_ICON_SIZE}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <span className="prisma-info-panel__feature-text">{feature.text}</span>
    </div>
  );
}
