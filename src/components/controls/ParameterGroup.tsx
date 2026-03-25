/**
 * @file ParameterGroup
 * @description Collapsible group container that renders a category of
 * parameters with a title delimiter, optional icon, and per-group style.
 * Each group acts as a visual section in the inspector.
 */

import { useState } from 'react';
import type { ParameterGroupDef } from './types';
import { ControlFactory } from './ControlFactory';

interface ParameterGroupProps {
  group: ParameterGroupDef;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}

export function ParameterGroup({ group, values, onChange }: ParameterGroupProps) {
  const [collapsed, setCollapsed] = useState(group.collapsed ?? false);

  const visibleParams = group.parameters.filter((p) => !p.hidden);
  if (visibleParams.length === 0) return null;

  const styleClass =
    group.style && group.style !== 'default' ? ` shell-inspector__group--${group.style}` : '';

  return (
    <div className={`shell-inspector__group${styleClass}`}>
      <button
        type="button"
        className="shell-inspector__group-header"
        onClick={() => setCollapsed(!collapsed)}
        aria-expanded={!collapsed}
      >
        {group.icon && <span className="shell-inspector__group-icon">{group.icon}</span>}
        <h4 className="shell-inspector__group-title">{group.label}</h4>
        <span className="shell-inspector__group-count">{visibleParams.length}</span>
        <span
          className={`shell-inspector__group-chevron${collapsed ? ' shell-inspector__group-chevron--collapsed' : ''}`}
        >
          ▾
        </span>
      </button>
      {group.description && !collapsed && (
        <p className="shell-inspector__group-desc">{group.description}</p>
      )}
      {!collapsed && (
        <div className="shell-inspector__group-body">
          {visibleParams.map((param) => (
            <ControlFactory
              key={param.key}
              param={param}
              value={values[param.key]}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
