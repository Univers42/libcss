import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  it('renders correctly with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('handles change events', () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Accept terms" onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Checkbox label="Disabled" disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    // Label should also have disabled styles (checked via container class)
    const label = screen.getByText('Disabled').closest('label');
    expect(label).toHaveClass(/disabled/);
  });

  it('shows error state using aria-invalid', () => {
    render(<Checkbox label="Error" hasError />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('is not checked by default', () => {
    render(<Checkbox label="Unchecked" />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
