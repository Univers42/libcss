/**
 * @file StreamingShell
 * @description Full-bleed media streaming layout: floating nav + hero + content rows + modal.
 * Perfect for: streaming platforms (Netflix, Disney+, HBO Max, Prime Video),
 * media galleries, video portals, music platforms.
 *
 * ┌───────────────────────────────────────┐
 * │  ┌─ Floating Nav ──────────────────┐  │
 * │  │  Brand   Links     Actions [☰]  │  │
 * │  └─────────────────────────────────┘  │
 * │  ┌─ Hero (full-bleed) ────────────┐  │
 * │  │  Background + Overlays          │  │
 * │  │  ┌─ Content ─────────────────┐  │  │
 * │  │  │  Title / CTA / Desc       │  │  │
 * │  │  └──────────────────────────┘  │  │
 * │  │  ──── bottom fade ──────────── │  │
 * │  └─────────────────────────────────┘  │
 * │  ┌─ Content (overlaps hero) ──────┐  │
 * │  │  Category rows / grids          │  │
 * │  └─────────────────────────────────┘  │
 * │  ┌─ Footer ───────────────────────┐  │
 * │  └─────────────────────────────────┘  │
 * │  ┌─ Modal Overlay (conditional) ──┐  │
 * │  │  Video player / detail view     │  │
 * │  └─────────────────────────────────┘  │
 * └───────────────────────────────────────┘
 */

import { useState, useEffect } from 'react';
import { BurgerIcon } from '../../atoms/BurgerMenu';
import type { StreamingShellProps } from './shell.types';
import './StreamingShell.css';

export function StreamingShell({
  brand,
  nav,
  navActions,
  hero,
  heroBackground,
  children,
  footer,
  modal,
  heroHeight = '80vh',
  heroHeightMobile = '56vh',
  navTransparent = true,
  navHeight = '64px',
  contentOverlap = '80px',
  accentColor = '#e50914',
  bgColor = '#141414',
  colorScheme = 'dark',
  className = '',
}: StreamingShellProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!navTransparent) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [navTransparent]);

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modal]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileNavOpen]);

  const rootClass = [
    'shell-streaming',
    `shell-streaming--${colorScheme}`,
    scrolled ? 'shell-streaming--scrolled' : '',
    navTransparent ? 'shell-streaming--nav-transparent' : '',
    mobileNavOpen ? 'shell-streaming--nav-open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={rootClass}
      style={
        {
          '--streaming-hero-h': heroHeight,
          '--streaming-hero-h-mobile': heroHeightMobile,
          '--streaming-nav-h': navHeight,
          '--streaming-accent': accentColor,
          '--streaming-bg': bgColor,
          '--streaming-overlap': contentOverlap,
        } as React.CSSProperties
      }
    >
      <nav className="shell-streaming__nav" role="navigation" aria-label="Main navigation">
        <div className="shell-streaming__nav-left">
          {brand && <div className="shell-streaming__brand">{brand}</div>}
          <div className="shell-streaming__links" role="menubar">
            {nav}
          </div>
        </div>

        <div className="shell-streaming__nav-right">
          {navActions}
          <BurgerIcon
            isOpen={mobileNavOpen}
            onClick={() => setMobileNavOpen((v) => !v)}
            className="shell-streaming__burger"
          />
        </div>
      </nav>

      {mobileNavOpen && (
        <>
          <div
            className="shell-streaming__overlay"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />
          <div className="shell-streaming__mobile-nav" role="menu">
            {nav}
          </div>
        </>
      )}

      {(hero || heroBackground) && (
        <section className="shell-streaming__hero" aria-label="Featured content">
          {/* Background */}
          {heroBackground && (
            <div className="shell-streaming__hero-bg" aria-hidden="true">
              {typeof heroBackground === 'string' ? (
                <img
                  src={heroBackground}
                  alt=""
                  className="shell-streaming__hero-img"
                  loading="eager"
                />
              ) : (
                heroBackground
              )}
            </div>
          )}

          {/* Gradient overlays: left-to-right readability + bottom fade */}
          <div className="shell-streaming__hero-overlay" aria-hidden="true" />
          <div className="shell-streaming__hero-fade" aria-hidden="true" />

          {/* Content */}
          {hero && <div className="shell-streaming__hero-content">{hero}</div>}
        </section>
      )}

      <main className="shell-streaming__content">{children}</main>

      {footer && <footer className="shell-streaming__footer">{footer}</footer>}

      {modal && (
        <div
          className="shell-streaming__modal"
          role="dialog"
          aria-modal="true"
          aria-label="Media player"
        >
          {modal}
        </div>
      )}
    </div>
  );
}
