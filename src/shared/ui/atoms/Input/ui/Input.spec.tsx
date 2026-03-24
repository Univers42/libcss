import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Test input" />);
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  it('handles change events', () => {
    const handleChange = vi.fn();
    render(<Input placeholder="Test input" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('Test input');
    fireEvent.change(input, { target: { value: 'New value' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when the disabled prop is true', () => {
    render(<Input placeholder="Test input" disabled />);
    expect(screen.getByPlaceholderText('Test input')).toBeDisabled();
  });

  it('shows error state using aria-invalid', () => {
    render(<Input placeholder="Test input" hasError />);
    expect(screen.getByPlaceholderText('Test input')).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies the correct type attribute', () => {
    render(<Input placeholder="Password" type="password" />);
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password');
  });
});
