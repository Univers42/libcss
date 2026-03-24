import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch Component', () => {
  it('renders correctly with role="switch"', () => {
    render(<Switch label="Toggle me" id="test-switch" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
    expect(screen.getByText('Toggle me')).toBeInTheDocument();
  });

  it('updates checked state when clicked', () => {
    const handleChange = vi.fn();
    render(<Switch label="Toggle" onChange={handleChange} />);
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    expect(handleChange).toHaveBeenCalled();
    expect(toggle).toBeChecked();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Switch label="Disabled" disabled />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeDisabled();
    
    const container = screen.getByText('Disabled').closest('label');
    expect(container).toHaveClass(/disabled/);
  });

  it('shows error state visually and with aria-invalid', () => {
    render(<Switch label="Error" hasError />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-invalid', 'true');
    
    const container = screen.getByText('Error').closest('label');
    expect(container).toHaveClass(/error/);
  });
});
