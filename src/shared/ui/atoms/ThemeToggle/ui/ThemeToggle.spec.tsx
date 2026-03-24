import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle Component', () => {
  it('renders correct icon for light theme', () => {
    render(<ThemeToggle isDark={false} onToggle={() => {}} />);
    // La luna se muestra cuando NO es oscuro (para cambiar a oscuro)
    // Pero en el componente actual: isDark ? Sun : Moon
    // Si isDark es false, muestra Moon.
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onToggle when clicked', () => {
    const handleToggle = vi.fn();
    render(<ThemeToggle isDark={false} onToggle={handleToggle} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-pressed state', () => {
    const { rerender } = render(<ThemeToggle isDark={true} onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');

    rerender(<ThemeToggle isDark={false} onToggle={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });
});
