import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LazyImage } from './LazyImage';

describe('LazyImage', () => {
  const alt = 'LazyImage';
  const src = 'LazyImage.jpg';

  it('shows skeleton while image is loading', () => {
    render(<LazyImage alt={'alt1'} src={src} />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('hides skeleton after image load', () => {
    render(<LazyImage alt={'alt2'} src={src} />);
    const img = screen.getByRole('img');
    fireEvent.load(img);
    expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
  });

  it('image becomes visible after load', () => {
    render(<LazyImage alt={'alt3'} src={src} />);
    const img = screen.getByRole('img');
    expect(img).toHaveClass('opacity-0');
    fireEvent.load(img);
    expect(img).toHaveClass('opacity-100');
  });
});
