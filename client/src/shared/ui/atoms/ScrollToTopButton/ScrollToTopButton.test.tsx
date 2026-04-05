import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import ScrollToTopButton from './ScrollToTopButton';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../Icon', () => ({
  Icon: (props: any) => (
    <div data-testid="icon-mock" className={props.className}>
      {props.name}
    </div>
  ),
}));

describe('ScrollToTopButton', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });

  afterEach(() => {
    cleanup();
  });

  it('shows the button when scrollY>500', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 600,
      configurable: true,
    });
    render(<ScrollToTopButton />);
    fireEvent.scroll(window);

    const buttons = screen.getAllByTestId('icon-mock');
    expect(buttons[0]).toHaveClass('opacity-100');
  });

  it('hides the button when scrollY<=500', () => {
    Object.defineProperty(window, 'scrollY', {
      value: 400,
      configurable: true,
    });
    render(<ScrollToTopButton />);
    fireEvent.scroll(window);
    const buttons = screen.getAllByTestId('icon-mock');
    expect(buttons[0]).toHaveClass('opacity-0');
  });

  it('after button click', () => {
    const scrollToMock = vi.fn();
    window.scrollTo = scrollToMock;

    render(<ScrollToTopButton />);
    const buttons = screen.getAllByTestId('icon-mock')[0];
    fireEvent.click(buttons);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });
});
