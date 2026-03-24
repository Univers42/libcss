import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders correctly with label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when isLoading is true', () => {
    render(<Button label="Loading" isLoading={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('renders as a link when "to" prop is provided', () => {
    render(
      <BrowserRouter>
        <Button label="Go Home" to="/" />
      </BrowserRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders as an anchor when "href" prop is provided', () => {
    render(<Button label="External" href="https://google.com" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://google.com');
  });
});
