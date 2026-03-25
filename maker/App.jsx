/**
 * Maker — Polymorphic Component Laboratory
 *
 * Unified playground for designing component variants.
 * Every component type (button, input, card …) is a ComponentDefinition
 * with schema + defaults + render — defined once in src/definitions/*.
 *
 * Users generate VARIANTS (named prop sets) persisted as:
 *   conf/{componentType}/{slug}.json
 *
 * Architecture layers:
 *   ComponentDefinition  → finite rules (schema + defaults + renderer)
 *   Variants             → infinite named styles   (conf/button/*.json)
 *   Instances (future)   → infinite placements      (variant ref + overrides)
 *
 * libcss provides:
 *   PanelShell, ParameterGroup, useJsonConf, deepClone, resolveProps, variantToCSS
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// ── libcss ──
import { PanelShell } from '@libcss/components/layout/shell/PanelShell';
import { ParameterGroup } from '@libcss/components/controls';
import { useJsonConf } from '@libcss/hooks';
import { deepClone, flatten, setPath } from '@libcss/common';
import { resolveProps, diffFromDefaults, variantToCSS } from '@libcss/core';

// ── Component definitions ──
import { buttonDefinition } from './src/definitions/button';
import { DemoMode } from './src/DemoMode';

// ═══════════════════════════════════════════════════════
// All available component types — add new ones here.
// ═══════════════════════════════════════════════════════

const COMPONENT_TYPES = [buttonDefinition];
const TYPE_MAP = Object.fromEntries(COMPONENT_TYPES.map((d) => [d.type, d]));

// ═══════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════

const BG_OPTIONS = [
  { name: 'Light', value: '#ffffff' },
  { name: 'Gray',  value: '#f3f4f6' },
  { name: 'Dark',  value: '#1f2937' },
  { name: 'Navy',  value: '#1e1b4b' },
];

function slugify(s) {
  return s.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-').replaceAll(/(^-|-$)/g, '') || 'variant';
}

function uniqueSlug(base, entries) {
  let slug = slugify(base);
  if (!entries.some((e) => e.name === slug)) return slug;
  let i = 2;
  while (entries.some((e) => e.name === `${slug}-${i}`)) i++;
  return `${slug}-${i}`;
}

// ═══════════════════════════════════════════════════════
// App
// ═══════════════════════════════════════════════════════

export default function App() {
  // ── Active component type (polymorphic) ──
  const [activeType, setActiveType] = useState('button');
  const def = TYPE_MAP[activeType];

  // ── File-backed persistence — scoped to the active component type ──
  const { entries, save, patch, commit, remove, loading, error } = useJsonConf(`/api/conf/${activeType}`);

  const [selectedSlug, setSelectedSlug] = useState(null);
  const [bg, setBg]             = useState('#ffffff');
  const [jsonOpen, setJsonOpen] = useState(false);
  const [cssOpen, setCssOpen]   = useState(false);
  const [copied, setCopied]     = useState(false);
  const [demoMode, setDemoMode]  = useState(false);

  const selected = entries.find((e) => e.name === selectedSlug) ?? null;

  /** Resolved props = definition defaults deep-merged with variant data (nested). */
  const resolvedProps = useMemo(
    () => (selected ? resolveProps(def.defaults, selected.data) : def.defaults),
    [selected, def],
  );

  /** Flat view of the selected data — bridges nested storage ↔ flat controls. */
  const flatValues = useMemo(
    () => (selected ? flatten(selected.data) : {}),
    [selected],
  );

  // ── Ref for latest data (avoids stale closures during rapid edits) ──
  const dataRef = useRef(null);
  useEffect(() => {
    dataRef.current = selected ? selected.data : null;
  }, [selected]);

  // Auto-select first entry once loaded
  useEffect(() => {
    if (entries.length > 0 && (!selectedSlug || !entries.some((e) => e.name === selectedSlug))) {
      setSelectedSlug(entries[0].name);
    }
  }, [entries, selectedSlug]);

  // ── CRUD ──────────────────────────────────────────

  /**
   * Live preview — updates local state only (no disk write).
   * Uses ref to avoid stale closures during rapid slider drags.
   */
  const handleChange = useCallback(
    (key, value) => {
      if (!dataRef.current || !selectedSlug) return;
      const next = deepClone(dataRef.current);
      setPath(next, key, value);
      dataRef.current = next;
      patch(selectedSlug, next);
    },
    [selectedSlug, patch],
  );

  /**
   * Commit — persists current state to disk (immediate PUT).
   * Fired on pointer-up (sliders), blur (text/color), or change (discrete).
   */
  const handleCommit = useCallback(
    (key, value) => {
      if (!dataRef.current || !selectedSlug) return;
      // Re-apply value (in case onCommit fires without a prior onChange)
      const next = deepClone(dataRef.current);
      setPath(next, key, value);
      dataRef.current = next;
      commit(selectedSlug, next);
    },
    [selectedSlug, commit],
  );

  /** Create a blank variant with schema defaults. */
  const createNew = useCallback(() => {
    const slug = uniqueSlug(`new-${activeType}`, entries);
    save(slug, { ...def.defaults, name: `New ${def.label}` });
    setSelectedSlug(slug);
  }, [entries, save, activeType, def]);

  /** Duplicate an existing variant. */
  const duplicate = useCallback(
    (entry) => {
      const slug = uniqueSlug(`${entry.name}-copy`, entries);
      save(slug, { ...deepClone(entry.data), name: `${entry.data.name} (copy)` });
      setSelectedSlug(slug);
    },
    [entries, save],
  );

  /** Delete a variant from disk. */
  const handleRemove = useCallback(
    (slug) => {
      remove(slug);
      if (selectedSlug === slug) {
        const next = entries.find((e) => e.name !== slug);
        setSelectedSlug(next?.name ?? null);
      }
    },
    [entries, selectedSlug, remove],
  );

  // ── Export / Copy ──────────────────────────────────

  const exportAll = useCallback(() => {
    const blob = new Blob(
      [JSON.stringify(entries.map((e) => e.data), null, 2)],
      { type: 'application/json' },
    );
    Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: `${activeType}-variants.json`,
    }).click();
  }, [entries, activeType]);

  /** Copy CSS for the selected variant to clipboard. */
  const copyCss = useCallback(async () => {
    if (!selected) return;
    const css = variantToCSS(`${activeType}-${selected.name}`, resolvedProps);
    await navigator.clipboard.writeText(css).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [selected, activeType, resolvedProps]);

  /** Copy JSON to clipboard. */
  const copyJson = useCallback(async () => {
    if (!selected) return;
    const diff = diffFromDefaults(def.defaults, selected.data);
    await navigator.clipboard.writeText(JSON.stringify(diff, null, 2)).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [selected, def]);

  // ═══════════════════════════════════════════════════════
  // Render
  // ═══════════════════════════════════════════════════════

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'system-ui', color: '#6b7280' }}>
        Loading variants…
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 12, fontFamily: 'system-ui', color: '#ef4444' }}>
        <span>Failed to load variants</span>
        <code style={{ fontSize: 12, color: '#6b7280' }}>{error}</code>
      </div>
    );
  }

  return (
    <PanelShell
      colorScheme="light"
      leftWidth="260px"
      rightWidth="320px"
      showBottom={jsonOpen || cssOpen}

      /* ── Header ── */
      brand={
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>{def.icon}</span>
          <strong>{def.label} Maker</strong>
          <span className="shell-inspector__badge">lab</span>
        </span>
      }
      toolbar={
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* Component type switcher */}
          {COMPONENT_TYPES.length > 1 && (
            <select
              value={activeType}
              onChange={(e) => { setActiveType(e.target.value); setSelectedSlug(null); }}
              style={{ fontSize: 12, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--clr-border-subtle, #dde0e4)', background: 'transparent' }}
            >
              {COMPONENT_TYPES.map((d) => (
                <option key={d.type} value={d.type}>{d.icon} {d.label}</option>
              ))}
            </select>
          )}
          <button className="shell-inspector__reset" onClick={createNew}>＋ New</button>
          <button className="shell-inspector__reset" onClick={exportAll}>↓ Export</button>
          <button
            className="shell-inspector__reset"
            onClick={() => setDemoMode(!demoMode)}
            style={{ background: demoMode ? 'rgba(59,130,246,0.1)' : undefined, color: demoMode ? '#3b82f6' : undefined }}
          >
            {demoMode ? '✕ Exit Demo' : '▶ Demo'}
          </button>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>
            {entries.length} variant{entries.length === 1 ? '' : 's'} · <code style={{ fontSize: 10 }}>conf/{activeType}/*.json</code>
          </span>
        </div>
      }

      /* ── Left: variant list ── */
      leftPanel={
        <div className="shell-inspector" style={{ height: '100%', overflow: 'auto' }}>
          <div className="shell-inspector__header">
            <div className="shell-inspector__title-row">
              <h3 className="shell-inspector__title">Variants</h3>
              <span className="shell-inspector__badge">{entries.length}</span>
            </div>
          </div>
          <div className="shell-inspector__controls" style={{ padding: '8px 12px' }}>
            {entries.map((entry) => (
              <div
                key={entry.name}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedSlug(entry.name)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedSlug(entry.name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 8, cursor: 'pointer', marginBottom: 4,
                  background: entry.name === selectedSlug ? 'rgba(59,130,246,0.1)' : 'transparent',
                  border: entry.name === selectedSlug ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                }}
              >
                {/* mini preview */}
                <div style={{ transform: 'scale(0.5)', transformOrigin: 'center', pointerEvents: 'none', width: 50, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {def.render(resolveProps(def.defaults, entry.data))}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {entry.data.name || entry.name}
                  </div>
                  <div style={{ fontSize: 10, color: '#9ca3af', fontFamily: 'monospace' }}>
                    .{activeType}-{entry.name}
                  </div>
                </div>
                <span style={{ display: 'flex', gap: 2 }}>
                  <button
                    className="shell-inspector__reset"
                    onClick={(e) => { e.stopPropagation(); duplicate(entry); }}
                    title="Duplicate"
                    style={{ padding: '2px 6px', fontSize: 11 }}
                  >⧉</button>
                  <button
                    className="shell-inspector__reset"
                    onClick={(e) => { e.stopPropagation(); handleRemove(entry.name); }}
                    title="Delete"
                    style={{ padding: '2px 6px', fontSize: 11, color: '#ef4444' }}
                  >✕</button>
                </span>
              </div>
            ))}
          </div>
        </div>
      }

      /* ── Right: parameter inspector ── */
      rightPanel={
        selected ? (
          <aside className="shell-inspector" style={{ height: '100%', overflow: 'auto' }}>
            <div className="shell-inspector__header">
              <div className="shell-inspector__title-row">
                <h3 className="shell-inspector__title">{selected.data.name || selected.name}</h3>
                <span className="shell-inspector__badge" style={{ fontFamily: 'monospace' }}>
                  .{activeType}-{selected.name}
                </span>
              </div>
            </div>
            <div className="shell-inspector__controls">
              {def.schema.groups.map((group) => (
                <ParameterGroup
                  key={group.id}
                  group={group}
                  values={flatValues}
                  onChange={handleChange}
                  onCommit={handleCommit}
                />
              ))}
            </div>
          </aside>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>
            👈 Select a variant
          </div>
        )
      }

      /* ── Bottom: JSON / CSS viewer ── */
      bottomPanel={
        selected ? (
          <div style={{ maxHeight: 280, overflow: 'auto', padding: '8px 20px' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
              <button
                className="shell-inspector__reset"
                onClick={() => { setJsonOpen(true); setCssOpen(false); }}
                style={{ fontSize: 11, fontWeight: jsonOpen && !cssOpen ? 600 : 400 }}
              >
                JSON
              </button>
              <button
                className="shell-inspector__reset"
                onClick={() => { setCssOpen(true); setJsonOpen(false); }}
                style={{ fontSize: 11, fontWeight: cssOpen ? 600 : 400 }}
              >
                CSS
              </button>
              <div style={{ flex: 1 }} />
              <button
                className="shell-inspector__reset"
                onClick={cssOpen ? copyCss : copyJson}
                style={{ fontSize: 11 }}
              >
                {copied ? '✓ Copied!' : '⧉ Copy'}
              </button>
            </div>

            {cssOpen ? (
              /* Generated CSS for the selected variant */
              <pre style={{ fontSize: 11, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#5f6368' }}>
                {variantToCSS(`${activeType}-${selected.name}`, resolvedProps)}
              </pre>
            ) : (
              /* JSON diff — only changed keys */
              <pre style={{ fontSize: 11, lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: '#5f6368' }}>
                <span style={{ fontSize: 10, color: '#9ca3af', display: 'block', marginBottom: 4 }}>
                  conf/{activeType}/{selected.name}.json — {Object.keys(flatten(diffFromDefaults(def.defaults, selected.data))).length} changed keys
                </span>
                {JSON.stringify(selected.data, null, 2)}
              </pre>
            )}
          </div>
        ) : null
      }
    >
      {/* ── Main: preview stage ── */}
      {demoMode ? (
        <DemoMode baseConfig={resolvedProps} intervalMs={2500} />
      ) : (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* background switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderBottom: '1px solid var(--clr-border-subtle, #e2e5ea)', background: 'var(--clr-surface, #fff)' }}>
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: '#9ca3af', marginRight: 4 }}>Stage:</span>
          {BG_OPTIONS.map((o) => (
            <button
              key={o.name}
              className="shell-inspector__reset"
              onClick={() => setBg(o.value)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', fontSize: 11,
                border: bg === o.value ? '1px solid #3b82f6' : '1px solid var(--clr-border-subtle, #dde0e4)',
                color: bg === o.value ? '#3b82f6' : undefined,
              }}
            >
              <span style={{ width: 12, height: 12, borderRadius: 2, background: o.value, border: '1px solid rgba(0,0,0,0.1)' }} />
              {o.name}
            </button>
          ))}
        </div>

        {/* component preview */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: bg, transition: 'background 0.2s' }}>
          {selected ? (
            def.render(resolvedProps)
          ) : (
            <span style={{ color: '#9ca3af' }}>← Create or select a variant</span>
          )}
        </div>

        {/* status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 20px', borderTop: '1px solid var(--clr-border-subtle, #e2e5ea)', background: 'var(--clr-surface, #fff)', fontSize: 11, color: '#9ca3af' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="shell-inspector__reset" onClick={() => { setJsonOpen(!jsonOpen); setCssOpen(false); }} style={{ fontSize: 11 }}>
              {jsonOpen && !cssOpen ? '▾' : '▸'} JSON
            </button>
            <button className="shell-inspector__reset" onClick={() => { setCssOpen(!cssOpen); setJsonOpen(false); }} style={{ fontSize: 11 }}>
              {cssOpen ? '▾' : '▸'} CSS
            </button>
          </div>
          <span>Hover the {activeType} to preview hover effects</span>
        </div>
      </div>
      )}
    </PanelShell>
  );
}