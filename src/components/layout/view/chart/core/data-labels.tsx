/**
 * @file DataLabels
 * @description SVG text overlays positioned at data element centers.
 */

import { CLS, DATA_LABEL_OFFSET } from '../Chart.constants';

interface DataLabelItem {
  x: number;
  y: number;
  value: string | number;
  anchor?: 'start' | 'middle' | 'end';
}

interface DataLabelsProps {
  items: DataLabelItem[];
  color?: string;
  animate?: boolean;
  animationDuration?: number;
}

export function DataLabels({ items, color, animate, animationDuration = 600 }: DataLabelsProps) {
  return (
    <g className={`${CLS}__data-labels`}>
      {items.map((item, i) => (
        <text
          key={i}
          x={item.x}
          y={item.y - DATA_LABEL_OFFSET}
          textAnchor={item.anchor ?? 'middle'}
          fill={color ?? 'currentColor'}
          fontSize="11px"
          fontWeight={500}
          opacity={animate ? 0 : 1}
          style={
            animate
              ? {
                  animation: `prisma-chart-fade-in ${animationDuration}ms ease-out ${i * 30 + animationDuration}ms forwards`,
                }
              : undefined
          }
        >
          {typeof item.value === 'number'
            ? item.value.toLocaleString(undefined, { maximumFractionDigits: 1 })
            : item.value}
        </text>
      ))}
    </g>
  );
}
