import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Page } from './Page';

describe('Page Component', () => {
  it('should render page with title', () => {
    render(<Page title="Test Page">Content</Page>);
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('should render children content', () => {
    render(<Page title="Test">Test Content</Page>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    const { container } = render(<Page title="Test">Content</Page>);
    const pageDiv = container.querySelector('div');
    expect(pageDiv?.className).toContain('min-h-screen');
    expect(pageDiv?.className).toContain('bg-gray-50');
  });
});
