/**
 * @file Chart
 * @description Main chart orchestrator — resolves config, runs transforms,
 * creates scales, and delegates rendering to the appropriate chart variant.
 */

import { useMemo, type ReactNode } from 'react';

import type {
  ChartConfig,
  ChartProps,
  ChartStyle,
  ProcessedDataPoint,
  ProcessedGroupedData,
  ProcessedPieSlice,
  ProcessedScatterPoint,
  YAxisConfig,
} from './Chart.types';

import { CLS, CHART_HEIGHTS, DEFAULT_MARGINS, PIE_MARGINS, DEFAULT_STYLE } from './Chart.constants';

import {
  processCartesianData,
  processGroupedData,
  processPieData,
  processScatterData,
  getGroupKeys,
  createBandScale,
  createLinearScale,
  createColorScale,
  computeDomain,
  useChartDimensions,
  XAxis,
  YAxis,
  GridLines,
  ChartLegend,
  ChartTooltip,
  useTooltip,
  DataLabels,
  ReferenceLine,
} from './core';

import { getPalette, getColor } from './palettes';

import { BarChart } from './charts/BarChart';
import { HorizontalBarChart } from './charts/HorizontalBarChart';
import { StackedBarChart } from './charts/StackedBarChart';
import { GroupedBarChart } from './charts/GroupedBarChart';
import { LineChart } from './charts/LineChart';
import { AreaChart } from './charts/AreaChart';
import { PieChart } from './charts/PieChart';
import { DonutChart } from './charts/DonutChart';
import { ScatterChart } from './charts/ScatterChart';
import { ComboChart } from './charts/ComboChart';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function resolveStyle(style?: ChartStyle): Required<ChartStyle> {
  return { ...DEFAULT_STYLE, ...style };
}

function isPieType(type: string): boolean {
  return type === 'pie' || type === 'donut';
}

function isGroupedType(type: string): boolean {
  return type === 'stacked-bar' || type === 'grouped-bar';
}

/** Area / Line charts with a groupBy config should also use grouped data. */
function isMultiSeries(config: ChartConfig): boolean {
  return (config.type === 'area' || config.type === 'line') && !!config.yAxis?.groupBy;
}

function isScatterType(type: string): boolean {
  return type === 'scatter';
}

function isComboType(type: string): boolean {
  return type === 'combo';
}

function resolveRefLine(yAxis?: YAxisConfig) {
  if (!yAxis?.referenceLine) return null;
  if (typeof yAxis.referenceLine === 'number') {
    return { value: yAxis.referenceLine, label: undefined, color: undefined };
  }
  return yAxis.referenceLine;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function Chart({
  config,
  className,
  width: widthProp,
  height: heightProp,
  onDataClick: _onDataClick,
  renderTooltip,
}: ChartProps) {
  const style = resolveStyle(config.style);
  const palette = getPalette(style.palette);
  const isPie = isPieType(config.type);
  const margins = isPie ? PIE_MARGINS : DEFAULT_MARGINS;

  const resolvedHeight = heightProp ?? CHART_HEIGHTS[style.height];
  const { ref, dimensions } = useChartDimensions(margins, widthProp ?? 600, resolvedHeight);
  const { tip, show: showTip, hide: hideTip } = useTooltip();

  const multiSeries = isMultiSeries(config);

  const cartesian = useMemo<ProcessedDataPoint[]>(
    () =>
      !isPie &&
      !isGroupedType(config.type) &&
      !multiSeries &&
      !isScatterType(config.type) &&
      !isComboType(config.type)
        ? processCartesianData(config)
        : [],
    [config, isPie, multiSeries],
  );

  const grouped = useMemo<ProcessedGroupedData[]>(
    () => (isGroupedType(config.type) || multiSeries ? processGroupedData(config) : []),
    [config, multiSeries],
  );

  const pie = useMemo<ProcessedPieSlice[]>(
    () => (isPie ? processPieData(config) : []),
    [config, isPie],
  );

  const scatter = useMemo<ProcessedScatterPoint[]>(
    () => (isScatterType(config.type) ? processScatterData(config) : []),
    [config],
  );

  const groupKeys = useMemo(() => (grouped.length > 0 ? getGroupKeys(grouped) : []), [grouped]);

  const scales = useMemo<{
    xScale: any;
    yScale: any;
    colorScale: ReturnType<typeof createColorScale>;
  } | null>(() => {
    if (isPie) return null;
    const { innerWidth, innerHeight } = dimensions;

    if (isScatterType(config.type)) {
      const xs = scatter.map((p) => p.x);
      const ys = scatter.map((p) => p.y);
      return {
        xScale: createLinearScale(computeDomain(xs), [0, innerWidth]),
        yScale: createLinearScale(computeDomain(ys), [innerHeight, 0]),
        colorScale: createColorScale(
          [...new Set(scatter.map((p) => p.group ?? 'default'))],
          palette,
        ),
      };
    }

    if (isGroupedType(config.type) || multiSeries) {
      const labels = grouped.map((d) => d.label);
      const maxVal = Math.max(
        ...grouped.map((d) => {
          if (config.type === 'stacked-bar') return d.total;
          return Math.max(...[...d.groups.values()]);
        }),
        0,
      );

      const yRange = config.yAxis?.range;
      const yDomain: [number, number] =
        yRange && yRange !== 'auto' ? [yRange.min, yRange.max] : [0, maxVal * 1.1 || 1];

      return {
        xScale: createBandScale(labels, [0, innerWidth], style.barGap),
        yScale: createLinearScale(yDomain, [innerHeight, 0]),
        colorScale: createColorScale(groupKeys, palette),
      };
    }

    if (isComboType(config.type)) {
      // For combo, process all series fields manually
      const seriesFields = config.series?.map((s) => s.field) ?? [];
      const labels = [
        ...new Set(config.data.map((d) => String(d[config.xAxis?.field ?? 'x'] ?? ''))),
      ];
      const allValues = config.data.flatMap((d) => seriesFields.map((f) => Number(d[f]) || 0));
      const maxVal = Math.max(...allValues, 0);

      return {
        xScale: createBandScale(labels, [0, innerWidth], style.barGap),
        yScale: createLinearScale([0, maxVal * 1.1 || 1], [innerHeight, 0]),
        colorScale: createColorScale(seriesFields, palette),
      };
    }

    if (config.type === 'horizontal-bar') {
      const labels = cartesian.map((d) => d.label);
      const values = cartesian.map((d) => d.value);
      const yRange = config.yAxis?.range;
      const _xDomain: [number, number] =
        yRange && yRange !== 'auto' ? [yRange.min, yRange.max] : computeDomain(values);

      return {
        xScale: createLinearScale([0, Math.max(...values) * 1.1 || 1], [0, innerWidth]),
        yScale: createBandScale(labels, [0, innerHeight], style.barGap) as any,
        colorScale: createColorScale(labels, palette),
      };
    }

    // Regular cartesian: bar, line, area
    const labels = cartesian.map((d) => d.label);
    const values = cartesian.map((d) => d.value);
    const yRange = config.yAxis?.range;
    const yDomain: [number, number] =
      yRange && yRange !== 'auto' ? [yRange.min, yRange.max] : [0, Math.max(...values) * 1.1 || 1];

    return {
      xScale: createBandScale(labels, [0, innerWidth], style.barGap),
      yScale: createLinearScale(yDomain, [innerHeight, 0]),
      colorScale: createColorScale(labels, palette),
    };
  }, [
    dimensions,
    config,
    cartesian,
    grouped,
    scatter,
    groupKeys,
    palette,
    style,
    isPie,
    multiSeries,
  ]);

  const colorFor = useMemo(() => {
    if (!scales) {
      // Pie/donut: map slice labels to palette colors by index
      return (key: string) => {
        const idx = pie.findIndex((s) => s.label === key);
        return getColor(palette, idx >= 0 ? idx : 0);
      };
    }
    const cs = scales.colorScale;
    return (key: string) => {
      try {
        return cs(key) ?? getColor(palette, 0);
      } catch {
        return getColor(palette, 0);
      }
    };
  }, [scales, palette, pie]);

  const handleHover = (
    label: string,
    group: string | null,
    value: number,
    cx: number,
    cy: number,
  ) => {
    const content = renderTooltip
      ? renderTooltip({ label, value, group: group ?? undefined } as any)
      : defaultTooltipContent(label, group, value);
    showTip(cx, cy, content);
  };

  const handlePieHover = (label: string, value: number, pct: number, cx: number, cy: number) => {
    const content = renderTooltip ? (
      renderTooltip({ label, value, percentage: pct } as any)
    ) : (
      <div>
        <strong>{label}</strong>
        <div>
          {value.toLocaleString()} ({pct.toFixed(1)}%)
        </div>
      </div>
    );
    showTip(cx, cy, content);
  };

  const handleScatterHover = (
    x: number,
    y: number,
    group: string | undefined,
    cx: number,
    cy: number,
  ) => {
    const content = renderTooltip ? (
      renderTooltip({ x, y, group } as any)
    ) : (
      <div>
        {group && <strong>{group}</strong>}
        <div>
          x: {x.toLocaleString()}, y: {y.toLocaleString()}
        </div>
      </div>
    );
    showTip(cx, cy, content);
  };

  const refLine = resolveRefLine(config.yAxis);

  const legendItems = useMemo(() => {
    if (!style.showLegend) return [];
    if (isPie) {
      return pie.map((s, i) => ({ label: s.label, color: getColor(palette, i) }));
    }
    if (isGroupedType(config.type) || multiSeries) {
      return groupKeys.map((k, i) => ({ label: k, color: getColor(palette, i) }));
    }
    if (isScatterType(config.type)) {
      const groups = [...new Set(scatter.map((p) => p.group ?? 'default'))];
      return groups.map((g, i) => ({ label: g, color: getColor(palette, i) }));
    }
    if (isComboType(config.type)) {
      return (config.series ?? []).map((s, i) => ({
        label: s.label ?? s.field,
        color: getColor(palette, i),
      }));
    }
    return [];
  }, [style, isPie, config, pie, groupKeys, scatter, palette, multiSeries]);

  const dataLabelItems = useMemo(() => {
    if (!style.dataLabels || isPie || isScatterType(config.type) || isComboType(config.type))
      return [];
    if (!scales) return [];

    if (isGroupedType(config.type)) return []; // too cluttered
    if (config.type === 'horizontal-bar') {
      return cartesian.map((d) => ({
        x: (scales.xScale as any)(d.value) + 6,
        y: ((scales.yScale as any)(d.label) ?? 0) + ((scales.yScale as any).bandwidth?.() ?? 0) / 2,
        value: d.value,
        anchor: 'start' as const,
      }));
    }

    return cartesian.map((d) => ({
      x: ((scales.xScale as any)(d.label) ?? 0) + ((scales.xScale as any).bandwidth?.() ?? 0) / 2,
      y: (scales.yScale as any)(d.value),
      value: d.value,
    }));
  }, [style, isPie, config, cartesian, scales]);

  const comboData = useMemo(() => {
    if (!isComboType(config.type) || !config.series) return [];
    const fields = config.series.map((s) => s.field);
    const xField = config.xAxis?.field ?? 'x';
    return [
      ...new Map(
        config.data.map((d) => {
          const label = String(d[xField] ?? '');
          const values: Record<string, number> = {};
          for (const f of fields) values[f] = Number(d[f]) || 0;
          return [label, { label, values }] as const;
        }),
      ).values(),
    ];
  }, [config]);

  const renderChart = (): ReactNode => {
    if (!scales && !isPie) return null;

    const common = {
      dimensions,
      palette,
      style: {
        animate: style.animate,
        animationDuration: style.animationDuration,
        dataLabels: style.dataLabels,
        curveType: style.curveType,
        donutRatio: style.donutRatio,
        barRadius: style.barRadius,
        barGap: style.barGap,
        pointRadius: style.pointRadius,
        showLegend: style.showLegend,
      },
      colorScale: colorFor,
    };

    switch (config.type) {
      case 'bar':
        return (
          <BarChart
            data={cartesian}
            dimensions={dimensions}
            xScale={scales!.xScale}
            yScale={scales!.yScale}
            palette={palette}
            style={common.style}
            colorScale={colorFor}
            onBarHover={(pt: ProcessedDataPoint, x: number, y: number) =>
              handleHover(pt.label, null, pt.value, x, y)
            }
            onBarLeave={hideTip}
          />
        );

      case 'horizontal-bar':
        return (
          <HorizontalBarChart
            data={cartesian}
            dimensions={dimensions}
            xScale={scales!.xScale}
            yScale={scales!.yScale}
            palette={palette}
            style={common.style}
            colorScale={colorFor}
            onBarHover={(pt: ProcessedDataPoint, x: number, y: number) =>
              handleHover(pt.label, null, pt.value, x, y)
            }
            onBarLeave={hideTip}
          />
        );

      case 'stacked-bar':
        return (
          <StackedBarChart
            data={grouped}
            groupKeys={groupKeys}
            dimensions={dimensions}
            xScale={scales!.xScale}
            yScale={scales!.yScale}
            palette={palette}
            style={common.style}
            colorScale={colorFor}
            onBarHover={(l, g, v, x, y) => handleHover(l, g, v, x, y)}
            onBarLeave={hideTip}
          />
        );

      case 'grouped-bar':
        return (
          <GroupedBarChart
            data={grouped}
            groupKeys={groupKeys}
            dimensions={dimensions}
            xScale={scales!.xScale}
            yScale={scales!.yScale}
            palette={palette}
            style={common.style}
            colorScale={colorFor}
            onBarHover={(l, g, v, x, y) => handleHover(l, g, v, x, y)}
            onBarLeave={hideTip}
          />
        );

      case 'line':
        return (
          <LineChart
            data={multiSeries && grouped.length > 0 ? grouped : cartesian}
            groupKeys={multiSeries ? groupKeys : undefined}
            dimensions={dimensions}
            xScale={scales!.xScale}
            yScale={scales!.yScale}
            palette={palette}
            style={common.style}
            colorScale={colorFor}
            onPointHover={(l, g, v, x, y) => handleHover(l, g, v, x, y)}
            onPointLeave={hideTip}
          />
        );

      case 'area':
        return (
          <AreaChart
            data={multiSeries && grouped.length > 0 ? grouped : cartesian}
            groupKeys={multiSeries ? groupKeys : undefined}
            dimensions={dimensions}
            xScale={scales!.xScale}
            yScale={scales!.yScale}
            palette={palette}
            style={common.style}
            colorScale={colorFor}
            onPointHover={(l, g, v, x, y) => handleHover(l, g, v, x, y)}
            onPointLeave={hideTip}
          />
        );

      case 'pie':
        return (
          <PieChart
            data={pie}
            dimensions={dimensions}
            palette={palette}
            style={common.style}
            colorScale={colorFor}
            onSliceHover={handlePieHover}
            onSliceLeave={hideTip}
          />
        );

      case 'donut': {
        const total = pie.reduce((s, d) => s + d.value, 0);
        return (
          <DonutChart
            data={pie}
            dimensions={dimensions}
            palette={palette}
            style={common.style}
            colorScale={colorFor}
            centerLabel={total.toLocaleString()}
            onSliceHover={handlePieHover}
            onSliceLeave={hideTip}
          />
        );
      }

      case 'scatter':
        return (
          <ScatterChart
            data={scatter}
            dimensions={dimensions}
            xScale={scales!.xScale}
            yScale={scales!.yScale}
            palette={palette}
            style={common.style}
            colorScale={colorFor}
            onPointHover={handleScatterHover}
            onPointLeave={hideTip}
          />
        );

      case 'combo':
        return (
          <ComboChart
            data={comboData}
            series={[...(config.series ?? [])]}
            dimensions={dimensions}
            xScale={scales!.xScale}
            yScale={scales!.yScale}
            palette={palette}
            style={common.style}
            colorScale={colorFor}
            onHover={(l, s, v, x, y) => handleHover(l, s, v, x, y)}
            onLeave={hideTip}
          />
        );

      default:
        return null;
    }
  };

  const showXLabel = !isPie && (style.axisNames === 'both' || style.axisNames === 'x-axis');
  const showYLabel = !isPie && (style.axisNames === 'both' || style.axisNames === 'y-axis');
  const isHorizontal = config.type === 'horizontal-bar';

  return (
    <div
      ref={ref}
      className={`${CLS} ${className ?? ''}`}
      style={{ position: 'relative', width: widthProp ?? '100%', height: resolvedHeight }}
      data-chart-palette={style.palette}
    >
      <svg
        className={`${CLS}__svg`}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <g transform={`translate(${margins.left},${margins.top})`}>
          {/* Grid */}
          {!isPie && scales && style.gridLines !== 'none' && (
            <GridLines
              mode={style.gridLines}
              xScale={scales.xScale}
              yScale={scales.yScale}
              innerWidth={dimensions.innerWidth}
              innerHeight={dimensions.innerHeight}
              color={palette.gridColor}
            />
          )}

          {/* Chart variant */}
          {renderChart()}

          {/* Data labels */}
          {dataLabelItems.length > 0 && (
            <DataLabels
              items={dataLabelItems}
              color={palette.textColor}
              animate={style.animate}
              animationDuration={style.animationDuration}
            />
          )}

          {/* Reference line */}
          {!isPie && scales && refLine && (
            <ReferenceLine
              value={refLine.value}
              label={refLine.label}
              color={refLine.color}
              yScale={scales.yScale}
              innerWidth={dimensions.innerWidth}
            />
          )}

          {/* Axes */}
          {!isPie && scales && (
            <>
              <XAxis
                scale={scales.xScale}
                height={dimensions.innerHeight}
                label={
                  showXLabel
                    ? isHorizontal
                      ? (config.yAxis?.label ?? config.yAxis?.field)
                      : (config.xAxis?.label ?? config.xAxis?.field)
                    : undefined
                }
                showLabel={showXLabel}
                color={palette.axisColor}
                innerWidth={dimensions.innerWidth}
              />
              <YAxis
                scale={scales.yScale}
                label={
                  showYLabel
                    ? isHorizontal
                      ? (config.xAxis?.label ?? config.xAxis?.field)
                      : (config.yAxis?.label ?? config.yAxis?.field)
                    : undefined
                }
                showLabel={showYLabel}
                color={palette.axisColor}
                innerHeight={dimensions.innerHeight}
              />
            </>
          )}
        </g>
      </svg>

      {/* Legend */}
      {style.showLegend && legendItems.length > 0 && (
        <ChartLegend items={legendItems} textColor={palette.textColor} />
      )}

      {/* Caption */}
      {style.caption && <p className={`${CLS}__caption`}>{style.caption}</p>}

      {/* Tooltip overlay */}
      {style.showTooltip && (
        <ChartTooltip x={tip.x} y={tip.y} visible={tip.visible}>
          {tip.content}
        </ChartTooltip>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Default tooltip content (used when no renderTooltip is provided).   */
/* ------------------------------------------------------------------ */

function defaultTooltipContent(label: string, group: string | null, value: number): ReactNode {
  return (
    <div>
      <strong>{label}</strong>
      {group && <span style={{ opacity: 0.7 }}> — {group}</span>}
      <div>{value.toLocaleString()}</div>
    </div>
  );
}
