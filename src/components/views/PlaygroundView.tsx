/**
 * @file PlaygroundView
 * @description Interactive component playground with live property controls.
 */

import { useState } from 'react';
import type { ComponentCategory, ComponentEntry } from '../../core/types';
import { CATEGORY_META } from '../../core/types';
import { registry } from '../../core/registry';
import { ComponentStage } from '../explorer/ComponentStage';
import { InspectorPanel } from '../explorer/InspectorPanel';
import { CodePreview } from '../explorer/CodePreview';
import { useComponentState } from '../../hooks/useComponentState';

export interface PlaygroundViewProps {
  componentId: string;
  category: ComponentCategory;
  onBack: () => void;
  /** Pre-loaded props from a variant preset card. */
  initialProps?: Record<string, unknown>;
}

export function PlaygroundView({
  componentId,
  category,
  onBack,
  initialProps,
}: PlaygroundViewProps) {
  const entry = registry.get(componentId) as ComponentEntry | undefined;
  const meta = CATEGORY_META[category];
  const { props, setProp, resetProps } = useComponentState(
    initialProps ? { ...(entry?.defaultProps ?? {}), ...initialProps } : (entry?.defaultProps ?? {}),
  );
  const [bgMode, setBgMode] = useState<'light' | 'dark' | 'checker'>('light');

  if (!entry) {
    return (
      <section className="shell-playground">
        <p>Component not found.</p>
        <button type="button" onClick={onBack}>
          Back to overview
        </button>
      </section>
    );
  }

  return (
    <section className="shell-playground">
      <div className="shell-playground__header">
        <button
          type="button"
          className="shell-playground__back"
          onClick={onBack}
          aria-label="Back to overview"
        >
          ←
        </button>
        <h1 className="shell-playground__title">{entry.name}</h1>
        <span className="shell-playground__badge">{meta.label}</span>
      </div>

      <p className="shell-playground__desc">{entry.description}</p>

      <div className="shell-playground__body">
        <div className="shell-playground__stage-col">
          <ComponentStage bgMode={bgMode} onBgModeChange={setBgMode}>
            {entry.render(props)}
          </ComponentStage>
          <CodePreview entry={entry} props={props} />
        </div>

        <aside>
          <InspectorPanel
            entry={entry}
            props={props}
            onChange={setProp}
            onReset={resetProps}
          />
        </aside>
      </div>
    </section>
  );
}
