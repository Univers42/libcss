import { useState } from 'react';
import type { ComponentCategory, ComponentEntry } from '@libcss/studio';
import {
  CATEGORY_META,
  registry,
  ComponentStage,
  InspectorPanel,
  CodePreview,
  useComponentState,
} from '@libcss/studio';

interface PlaygroundViewProps {
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
      <section className="playground">
        <p>Component not found.</p>
        <button type="button" onClick={onBack}>
          Back to overview
        </button>
      </section>
    );
  }

  return (
    <section className="playground">
      <div className="playground__header">
        <button
          type="button"
          className="playground__back"
          onClick={onBack}
          aria-label="Back to overview"
        >
          ←
        </button>
        <h1 className="playground__title">{entry.name}</h1>
        <span className="playground__badge">{meta.label}</span>
      </div>

      <p className="playground__desc">{entry.description}</p>

      <div className="playground__body">
        <div className="playground__stage-col">
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
