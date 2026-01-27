import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
  it('should render header with title', () => {
    render(<Header />);
    expect(screen.getByText('Software Request System')).toBeInTheDocument();
  });

  it('should render header with subtitle', () => {
    render(<Header />);
    expect(screen.getByText('Manage your software requests')).toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header?.className).toContain('bg-blue-600');
    expect(header?.className).toContain('text-white');
  });
});
