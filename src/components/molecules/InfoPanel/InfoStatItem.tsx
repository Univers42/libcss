import type { InfoStat } from './InfoPanel.types';

export function InfoStatItem({ stat }: { stat: InfoStat }) {
  return (
    <div className="prisma-info-panel__stat">
      <span className="prisma-info-panel__stat-value">{stat.value}</span>
      <span className="prisma-info-panel__stat-label">{stat.label}</span>
    </div>
  );
}
