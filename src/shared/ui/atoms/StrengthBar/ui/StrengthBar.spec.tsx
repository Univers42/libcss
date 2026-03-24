import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StrengthBar } from './StrengthBar';

describe('StrengthBar Component', () => {
  it('renders with correct accessibility attributes', () => {
    render(<StrengthBar level={2} label="Medium" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '2');
    expect(progressBar).toHaveAttribute('aria-label', 'Medium');
  });

  it('renders the correct label text', () => {
    render(<StrengthBar level={3} label="Strong" />);
    expect(screen.getByText('Strong')).toBeInTheDocument();
  });

  it('renders segments based on level', () => {
    const { container } = render(<StrengthBar level={2} maxLevel={4} />);
    // Buscamos los segmentos activos. Como StrengthBarSegment es interno, 
    // podemos buscar por clases si las conocemos o por la estructura.
    // En este caso, buscaremos los elementos que tienen la clase de activo.
    const activeSegments = container.querySelectorAll('[class*="active"]');
    expect(activeSegments.length).toBe(2);
  });
});
