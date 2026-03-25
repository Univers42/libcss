/**
 * StylableButton — renders a button from a nested config.
 *
 * Expected shape:
 *   config.props     → { label, icon, iconPosition }
 *   config.style     → { base, hover, active, disabled }
 *     base.padding   → { top, right, bottom, left }
 *     base.border    → { radius, width, color, style }
 *     base.shadow    → { x, y, blur, spread, color }
 *     base.transform → { scale, rotate, skewX, skewY, translateX, translateY }
 *     base.transition→ { property, duration, timing, delay }
 *     hover/active   → same nested sub-objects
 */
import { useState } from 'react';

// ── helpers ──────────────────────────────────────────

function px(v) {
  return v != null ? `${v}px` : undefined;
}

/** Build CSS box-shadow string from a shadow sub-object. */
function buildShadow(sh) {
  if (!sh) return 'none';
  const x = sh.x ?? 0;
  const y = sh.y ?? 4;
  const b = sh.blur ?? 6;
  const s = sh.spread ?? 0;
  const c = sh.color ?? 'rgba(0,0,0,0.1)';
  if (b === 0 && x === 0 && y === 0 && s === 0) return 'none';
  return `${x}px ${y}px ${b}px ${s}px ${c}`;
}

/** Build CSS transform string from a transform sub-object. */
function buildTransform(tf) {
  if (!tf) return 'none';
  /** @type {string[]} */
  const parts = [];
  if (tf.scale != null && tf.scale !== 1)              parts.push(`scale(${tf.scale})`);
  if (tf.rotate != null && tf.rotate !== 0)            parts.push(`rotate(${tf.rotate}deg)`);
  if (tf.skewX != null && tf.skewX !== 0)              parts.push(`skewX(${tf.skewX}deg)`);
  if (tf.skewY != null && tf.skewY !== 0)              parts.push(`skewY(${tf.skewY}deg)`);
  if (tf.translateX != null && tf.translateX !== 0)    parts.push(`translateX(${tf.translateX}px)`);
  if (tf.translateY != null && tf.translateY !== 0)    parts.push(`translateY(${tf.translateY}px)`);
  return parts.length > 0 ? parts.join(' ') : 'none';
}

/** Build CSS transition shorthand from a transition sub-object. */
function buildTransition(tr) {
  if (!tr) return 'all 0.2s ease';
  const prop = tr.property ?? 'all';
  const dur  = tr.duration ?? 0.2;
  const tim  = tr.timing   ?? 'ease';
  const del  = tr.delay    ?? 0;
  return `${prop} ${dur}s ${tim}${del > 0 ? ` ${del}s` : ''}`;
}

// ── component ────────────────────────────────────────

export function StylableButton({ config, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  if (!config) return null;

  const props    = config.props    ?? {};
  const style    = config.style    ?? {};
  const base     = style.base      ?? {};
  const hvrData  = style.hover     ?? {};
  const actData  = style.active    ?? {};
  const pad      = base.padding    ?? {};
  const brd      = base.border     ?? {};
  const gradient = base.gradient   || '';

  // Gradient takes priority over solid backgroundColor
  const bgProps = gradient
    ? { background: gradient, backgroundSize: base.backgroundSize || undefined }
    : { backgroundColor: base.backgroundColor };

  const baseCSS = {
    fontFamily:      "'Inter', system-ui, sans-serif",
    ...bgProps,
    color:           base.color,
    fontSize:        px(base.fontSize),
    fontWeight:      base.fontWeight,
    textTransform:   base.textTransform || 'none',
    letterSpacing:   px(base.letterSpacing),
    lineHeight:      base.lineHeight ?? 1.2,
    paddingTop:      px(pad.top),
    paddingRight:    px(pad.right),
    paddingBottom:   px(pad.bottom),
    paddingLeft:     px(pad.left),
    borderRadius:    px(brd.radius),
    borderWidth:     px(brd.width),
    borderColor:     brd.color,
    borderStyle:     brd.style || 'solid',
    boxShadow:       buildShadow(base.shadow),
    minWidth:        base.minWidth ? px(base.minWidth) : undefined,
    opacity:         base.opacity ?? 1,
    cursor:          base.cursor || 'pointer',
    overflow:        base.overflow || 'hidden',
    transform:       buildTransform(base.transform),
    transition:      buildTransition(base.transition),
    outline:         'none',
    display:         'inline-flex',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             px(base.gap ?? 8),
    whiteSpace:      'nowrap',
  };

  // Build hover overrides — merges transform sub-objects so partial overrides work
  let stateOverrides = {};
  if (hovered) {
    const hoverBg = hvrData.gradient
      ? { background: hvrData.gradient }
      : hvrData.backgroundColor
        ? { backgroundColor: hvrData.backgroundColor }
        : {};
    // Merge hover transform on top of base transform
    const mergedHoverTf = hvrData.transform
      ? { ...(base.transform ?? {}), ...hvrData.transform }
      : base.transform;
    // Merge hover shadow on top of base shadow
    const mergedHoverSh = hvrData.shadow
      ? { ...(base.shadow ?? {}), ...hvrData.shadow }
      : base.shadow;
    stateOverrides = {
      ...hoverBg,
      color:           hvrData.color       || undefined,
      borderColor:     hvrData.borderColor || undefined,
      boxShadow:       buildShadow(mergedHoverSh),
      transform:       buildTransform(mergedHoverTf),
      opacity:         hvrData.opacity ?? undefined,
    };
    // Strip undefined so base values show through
    stateOverrides = Object.fromEntries(
      Object.entries(stateOverrides).filter(([, v]) => v !== undefined)
    );
  }

  // Build active overrides (layered on top of hover)
  if (pressed) {
    const act = {
      transform: actData.transform ? buildTransform(actData.transform) : undefined,
      boxShadow: actData.shadow    ? buildShadow(actData.shadow)      : undefined,
    };
    stateOverrides = { ...stateOverrides, ...Object.fromEntries(Object.entries(act).filter(([, v]) => v !== undefined)) };
  }

  const icon  = props.icon;
  const pos   = props.iconPosition;
  const label = props.label || 'Button';

  return (
    <button
      style={{ ...baseCSS, ...stateOverrides }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={onClick}
    >
      {icon && pos !== 'right' && <span>{icon}</span>}
      <span>{label}</span>
      {icon && pos === 'right' && <span>{icon}</span>}
    </button>
  );
}
