/**
 * DemoMode — Cinematic showcase that cycles through 24 dramatic button
 * transformations with CSS animation classes from the lcss-anim system.
 *
 * Features:
 *   - Dark stage with animated gradient background
 *   - Each keyframe applies style patches + an lcss-anim-* class
 *   - Professional overlay showing keyframe name + description
 *   - Smooth progress bar timeline
 *   - Keyboard navigation (Space, Arrow keys)
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { StylableButton } from './StylableButton';

// ═══════════════════════════════════════════════════════
// Keyframes — style patch + optional animation class
// ═══════════════════════════════════════════════════════

const KEYFRAMES = [
  {
    label: 'Entrance',
    desc: 'Bounces into view',
    anim: 'lcss-anim-bounce-in',
    patch: {},
  },
  {
    label: 'Neon Pulse',
    desc: 'Glowing violet heartbeat',
    anim: 'lcss-anim-pulse',
    patch: {
      style: {
        base: {
          backgroundColor: '#8b5cf6',
          shadow: { x: 0, y: 0, blur: 28, spread: 6, color: 'rgba(139,92,246,0.6)' },
        },
      },
    },
  },
  {
    label: 'Gradient Shift',
    desc: 'Flowing color spectrum',
    anim: 'lcss-anim-gradient-shift',
    patch: {
      style: {
        base: {
          gradient: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #667eea)',
          backgroundSize: '300% 300%',
          color: '#ffffff',
          shadow: { x: 0, y: 8, blur: 30, spread: 0, color: 'rgba(102,126,234,0.4)' },
        },
      },
    },
  },
  {
    label: 'Shimmer',
    desc: 'Metallic light sweep',
    anim: 'lcss-anim-shimmer',
    patch: {
      style: {
        base: {
          backgroundColor: '#1e293b',
          color: '#e2e8f0',
          border: { width: 1, color: '#334155', style: 'solid', radius: 8 },
        },
      },
    },
  },
  {
    label: 'Magnetic Float',
    desc: 'Weightless hovering effect',
    anim: 'lcss-anim-float',
    patch: {
      style: {
        base: {
          shadow: { x: 0, y: 20, blur: 40, spread: -8, color: 'rgba(0,0,0,0.3)' },
        },
      },
    },
  },
  {
    label: 'Jelly Bounce',
    desc: 'Elastic organic squish',
    anim: 'lcss-anim-jelly',
    patch: {
      style: {
        base: {
          backgroundColor: '#ec4899',
          border: { radius: 24 },
          padding: { top: 14, right: 36, bottom: 14, left: 36 },
        },
      },
    },
  },
  {
    label: 'Glitch',
    desc: 'Digital distortion artifact',
    anim: 'lcss-anim-glitch',
    patch: {
      style: {
        base: {
          backgroundColor: '#10b981',
          color: '#000000',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: 3,
        },
      },
    },
  },
  {
    label: 'Neon Sign',
    desc: 'Electric glow flicker',
    anim: 'lcss-anim-neon',
    patch: {
      style: {
        base: {
          backgroundColor: 'transparent',
          color: '#22d3ee',
          border: { width: 2, color: '#22d3ee', style: 'solid', radius: 6 },
          shadow: { x: 0, y: 0, blur: 15, spread: 2, color: 'rgba(34,211,238,0.5)' },
        },
      },
    },
  },
  {
    label: 'Rubber Band',
    desc: 'Stretchy snap animation',
    anim: 'lcss-anim-rubber-band',
    patch: {
      style: {
        base: {
          backgroundColor: '#f59e0b',
          color: '#000',
          border: { radius: 100 },
          padding: { top: 14, right: 44, bottom: 14, left: 44 },
        },
      },
    },
  },
  {
    label: 'Slide In',
    desc: 'Enters from the left',
    anim: 'lcss-anim-slide-left',
    patch: {
      style: {
        base: {
          backgroundColor: '#6366f1',
          border: { radius: 0, width: 0 },
          padding: { top: 16, right: 48, bottom: 16, left: 48 },
        },
      },
    },
  },
  {
    label: 'Flip Reveal',
    desc: '3D card flip on Y axis',
    anim: 'lcss-anim-flip-y',
    patch: {
      style: {
        base: {
          gradient: 'linear-gradient(180deg, #0ea5e9, #6366f1)',
          border: { radius: 12 },
        },
      },
    },
  },
  {
    label: 'Spin',
    desc: 'Full 360° rotation',
    anim: 'lcss-anim-spin',
    patch: {
      style: {
        base: {
          backgroundColor: '#ef4444',
          border: { radius: 50, width: 0 },
          padding: { top: 20, right: 20, bottom: 20, left: 20 },
          minWidth: 60,
          fontSize: 18,
        },
      },
    },
  },
  {
    label: 'Shake Alert',
    desc: 'Urgent attention grab',
    anim: 'lcss-anim-shake',
    patch: {
      style: {
        base: {
          backgroundColor: '#dc2626',
          color: '#fff',
          fontWeight: 700,
          shadow: { x: 0, y: 4, blur: 20, spread: 0, color: 'rgba(220,38,38,0.4)' },
        },
      },
    },
  },
  {
    label: 'Glow Ring',
    desc: 'Halo ripple expanding out',
    anim: 'lcss-anim-glow',
    patch: {
      style: {
        base: {
          backgroundColor: '#8b5cf6',
          border: { radius: 100, width: 0 },
          padding: { top: 14, right: 40, bottom: 14, left: 40 },
        },
      },
    },
  },
  {
    label: 'Cascade Ripple',
    desc: 'Concentric wave outward',
    anim: 'lcss-anim-ripple',
    patch: {
      style: {
        base: {
          gradient: 'radial-gradient(circle, #3b82f6, #1e40af)',
          shadow: { x: 0, y: 0, blur: 0, spread: 0, color: 'transparent' },
        },
      },
    },
  },
  {
    label: 'Ghost Wire',
    desc: 'Transparent outline only',
    anim: 'lcss-anim-pulse',
    patch: {
      style: {
        base: {
          backgroundColor: 'transparent',
          color: '#a78bfa',
          border: { width: 1, color: '#a78bfa', style: 'solid', radius: 8 },
          shadow: { x: 0, y: 0, blur: 12, spread: 0, color: 'rgba(167,139,250,0.3)' },
        },
      },
    },
  },
  {
    label: 'Deep Press',
    desc: 'Heavy 3D pushed-in feel',
    anim: 'lcss-anim-morph',
    patch: {
      style: {
        base: {
          backgroundColor: '#1e293b',
          color: '#94a3b8',
          border: { width: 1, color: '#334155', radius: 10 },
          shadow: { x: 0, y: 2, blur: 4, spread: 0, color: 'rgba(0,0,0,0.5)' },
          fontSize: 12,
          letterSpacing: 1,
          textTransform: 'uppercase',
        },
      },
    },
  },
  {
    label: 'Aurora',
    desc: 'Northern lights gradient',
    anim: 'lcss-anim-gradient-shift',
    patch: {
      style: {
        base: {
          gradient: 'linear-gradient(135deg, #a855f7, #06b6d4, #10b981, #a855f7)',
          backgroundSize: '400% 400%',
          color: '#fff',
          border: { radius: 12, width: 0 },
          padding: { top: 16, right: 48, bottom: 16, left: 48 },
          shadow: { x: 0, y: 8, blur: 32, spread: 0, color: 'rgba(168,85,247,0.3)' },
          fontWeight: 700,
          fontSize: 16,
        },
      },
    },
  },
  {
    label: 'Danger Zone',
    desc: 'Pulsing destructive warning',
    anim: 'lcss-anim-pulse',
    patch: {
      style: {
        base: {
          gradient: 'linear-gradient(135deg, #ef4444, #b91c1c)',
          color: '#fff',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: 2,
          fontSize: 11,
          border: { radius: 6, width: 0 },
          shadow: { x: 0, y: 4, blur: 24, spread: 0, color: 'rgba(239,68,68,0.5)' },
        },
      },
    },
  },
  {
    label: 'Neumorphic',
    desc: 'Soft extruded material',
    anim: 'lcss-anim-float',
    patch: {
      style: {
        base: {
          backgroundColor: '#e2e8f0',
          color: '#475569',
          border: { radius: 16, width: 0 },
          shadow: { x: 6, y: 6, blur: 12, spread: 0, color: 'rgba(0,0,0,0.1)' },
          fontWeight: 600,
        },
      },
    },
  },
  {
    label: 'Cyber Pill',
    desc: 'Futuristic rounded capsule',
    anim: 'lcss-anim-shimmer',
    patch: {
      style: {
        base: {
          gradient: 'linear-gradient(90deg, #0f172a, #1e293b)',
          color: '#38bdf8',
          border: { radius: 100, width: 1, color: '#0ea5e9', style: 'solid' },
          padding: { top: 12, right: 44, bottom: 12, left: 44 },
          shadow: { x: 0, y: 0, blur: 20, spread: 0, color: 'rgba(56,189,248,0.25)' },
          letterSpacing: 2,
          textTransform: 'uppercase',
          fontSize: 11,
          fontWeight: 600,
        },
      },
    },
  },
  {
    label: 'Fire Button',
    desc: 'Blazing hot gradient',
    anim: 'lcss-anim-gradient-shift',
    patch: {
      style: {
        base: {
          gradient: 'linear-gradient(135deg, #f59e0b, #ef4444, #ec4899, #f59e0b)',
          backgroundSize: '300% 300%',
          color: '#fff',
          fontWeight: 700,
          border: { radius: 10, width: 0 },
          shadow: { x: 0, y: 6, blur: 28, spread: 0, color: 'rgba(239,68,68,0.4)' },
          padding: { top: 14, right: 40, bottom: 14, left: 40 },
        },
      },
    },
  },
  {
    label: 'Morph Blob',
    desc: 'Organic shape melting',
    anim: 'lcss-anim-morph',
    patch: {
      style: {
        base: {
          gradient: 'linear-gradient(135deg, #c084fc, #818cf8)',
          border: { radius: 30, width: 0 },
          padding: { top: 18, right: 36, bottom: 18, left: 36 },
          shadow: { x: 0, y: 10, blur: 30, spread: 0, color: 'rgba(192,132,252,0.3)' },
        },
      },
    },
  },
  {
    label: 'Finale',
    desc: 'Everything at once',
    anim: 'lcss-anim-bounce-in',
    patch: {
      style: {
        base: {
          gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
          backgroundSize: '400% 400%',
          color: '#fff',
          fontWeight: 700,
          fontSize: 18,
          border: { radius: 14, width: 0 },
          padding: { top: 18, right: 52, bottom: 18, left: 52 },
          shadow: { x: 0, y: 12, blur: 40, spread: 0, color: 'rgba(139,92,246,0.4)' },
          letterSpacing: 1,
        },
      },
    },
  },
];

// ═══════════════════════════════════════════════════════
// Deep merge helper
// ═══════════════════════════════════════════════════════

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] != null &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      typeof target[key] === 'object' &&
      target[key] != null
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

// ═══════════════════════════════════════════════════════
// Stage background gradients (cycle)
// ═══════════════════════════════════════════════════════

const STAGE_GRADIENTS = [
  'radial-gradient(ellipse at 30% 50%, #1a1a2e 0%, #0a0a12 100%)',
  'radial-gradient(ellipse at 70% 40%, #1e1b2e 0%, #0d0b14 100%)',
  'radial-gradient(ellipse at 50% 60%, #0f172a 0%, #020617 100%)',
  'radial-gradient(ellipse at 40% 30%, #1a0a2e 0%, #0a0612 100%)',
];

// ═══════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════

export function DemoMode({ baseConfig, intervalMs = 3000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);
  const stageRef = useRef(null);
  const total = KEYFRAMES.length;
  const kf = KEYFRAMES[index];
  const progress = ((index + 1) / total) * 100;

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
      setAnimKey((k) => k + 1);
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [paused, intervalMs, total]);

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === ' ' || e.key === 'Space') { e.preventDefault(); setPaused((p) => !p); }
      if (e.key === 'ArrowRight') { setIndex((p) => (p + 1) % total); setAnimKey((k) => k + 1); }
      if (e.key === 'ArrowLeft')  { setIndex((p) => (p - 1 + total) % total); setAnimKey((k) => k + 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [total]);

  const goTo = useCallback((i) => {
    setIndex(i);
    setAnimKey((k) => k + 1);
    setPaused(true);
  }, []);

  // Build merged config
  const merged = kf.patch && Object.keys(kf.patch).length > 0
    ? deepMerge(baseConfig, kf.patch)
    : baseConfig;

  // Force long transition so the button smoothly morphs between keyframes
  const demoConfig = deepMerge(merged, {
    style: { base: { transition: { property: 'all', duration: 0.9, timing: 'cubic-bezier(0.22,1,0.36,1)', delay: 0 } } },
  });

  const stageGrad = STAGE_GRADIENTS[index % STAGE_GRADIENTS.length];

  return (
    <div style={styles.root}>
      {/* ── Progress bar ── */}
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>

      {/* ── Top controls ── */}
      <div style={styles.topBar}>
        <div style={styles.controls}>
          <button onClick={() => { setIndex((p) => (p - 1 + total) % total); setAnimKey((k) => k + 1); }} style={styles.ctrlBtn}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M7 1L3 5l4 4"/></svg>
          </button>
          <button onClick={() => setPaused(!paused)} style={{ ...styles.ctrlBtn, ...styles.ctrlBtnAccent }}>
            {paused
              ? <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M2 1l7 4-7 4z"/></svg>
              : <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><rect x="1" y="1" width="3" height="8"/><rect x="6" y="1" width="3" height="8"/></svg>
            }
          </button>
          <button onClick={() => { setIndex((p) => (p + 1) % total); setAnimKey((k) => k + 1); }} style={styles.ctrlBtn}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M3 1l4 4-4 4"/></svg>
          </button>
        </div>

        <div style={styles.counter}>
          <span style={styles.counterNum}>{String(index + 1).padStart(2, '0')}</span>
          <span style={styles.counterSep}>/</span>
          <span style={styles.counterTotal}>{String(total).padStart(2, '0')}</span>
        </div>

        <div style={styles.kfInfo}>
          <span style={styles.kfLabel}>{kf.label}</span>
          <span style={styles.kfDesc}>{kf.desc}</span>
        </div>
      </div>

      {/* ── Stage ── */}
      <div ref={stageRef} style={{ ...styles.stage, background: stageGrad }}>
        {/* Subtle grid pattern */}
        <div style={styles.grid} />

        {/*
          Button stays mounted — never gets a key change.
          CSS transition on the <button> handles the smooth morph between keyframes.
          The animation class wrapper remounts (via animKey) to re-trigger the entrance anim.
        */}
        <div style={styles.btnWrap}>
          <div key={animKey} className={kf.anim ? `${kf.anim} lcss-anim--once` : undefined}>
            <StylableButton config={demoConfig} />
          </div>
        </div>

        {/* Animation class badge */}
        {kf.anim && (
          <div style={styles.animBadge}>
            .{kf.anim}
          </div>
        )}
      </div>

      {/* ── Timeline ── */}
      <div style={styles.timeline}>
        {KEYFRAMES.map((kf_, i) => {
          const isActive = i === index;
          const isPast = i < index;
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={kf_.label}
              style={{
                ...styles.dot,
                background: isActive ? '#818cf8' : isPast ? '#4b5563' : '#1f2937',
                borderColor: isActive ? '#818cf8' : '#374151',
                transform: isActive ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Styles — dark cinematic theme
// ═══════════════════════════════════════════════════════

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#0a0a12',
    color: '#e2e8f0',
    fontFamily: "'Inter', system-ui, sans-serif",
    overflow: 'hidden',
  },
  progressTrack: {
    height: 2,
    background: '#1e1e2e',
    flexShrink: 0,
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #818cf8, #c084fc)',
    transition: 'width 0.4s ease',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '8px 16px',
    flexShrink: 0,
    borderBottom: '1px solid #1e1e2e',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  ctrlBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    border: '1px solid #2d2d3d',
    borderRadius: 6,
    background: '#141420',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.15s',
  },
  ctrlBtnAccent: {
    background: '#1e1b4b',
    borderColor: '#3730a3',
    color: '#818cf8',
  },
  counter: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 2,
    fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
    fontSize: 12,
  },
  counterNum: {
    color: '#818cf8',
    fontWeight: 700,
  },
  counterSep: {
    color: '#4b5563',
  },
  counterTotal: {
    color: '#6b7280',
    fontWeight: 500,
  },
  kfInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: 0,
  },
  kfLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: '#e2e8f0',
    whiteSpace: 'nowrap',
  },
  kfDesc: {
    fontSize: 11,
    color: '#64748b',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  stage: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    transition: 'background 1.2s ease',
  },
  grid: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
    backgroundSize: '24px 24px',
    pointerEvents: 'none',
  },
  btnWrap: {
    position: 'relative',
    zIndex: 1,
  },
  animBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
    fontSize: 10,
    color: '#4f46e5',
    background: '#1e1b4b',
    border: '1px solid #3730a3',
    padding: '3px 10px',
    borderRadius: 4,
    letterSpacing: 0.5,
  },
  timeline: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '8px 16px',
    overflowX: 'auto',
    borderTop: '1px solid #1e1e2e',
    flexShrink: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    border: '1px solid #374151',
    cursor: 'pointer',
    padding: 0,
    flexShrink: 0,
    transition: 'all 0.2s',
  },
};
