import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textbox } from './Textbox';

describe('Textbox Component', () => {
  it('should render textbox with placeholder', () => {
    render(<Textbox placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  it('should render label when provided', () => {
    render(<Textbox label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Textbox disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('should call onChange when text is entered', () => {
    const handleChange = vi.fn();
    render(<Textbox onChange={handleChange} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'new text' } });
    expect(handleChange).toHaveBeenCalledWith('new text');
  });

  it('should have default rows value', () => {
    render(<Textbox />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4');
  });
});
