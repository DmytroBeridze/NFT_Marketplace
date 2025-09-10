import type { TransitionStatus } from 'react-transition-group';

export const BURGER_TRANSITION_DURATION = 300;

// burger overlay
export const burgerOverlayDefaultStyle = {
  transition: `opacity ${BURGER_TRANSITION_DURATION}ms ease-in-out`,
  opacity: 0,
  pointerEvent: 'none',
};
export const burgerOverlayTransitionStyles: Record<
  TransitionStatus,
  React.CSSProperties
> = {
  entering: { opacity: 1, pointerEvents: 'auto' },
  entered: { opacity: 1, pointerEvents: 'auto' },
  exiting: { opacity: 0, pointerEvents: 'none' },
  exited: { opacity: 0, pointerEvents: 'none' },
  unmounted: {},
};

// burger menu
export const burgerDefaultStyle = {
  transition: `transform ${BURGER_TRANSITION_DURATION}ms ease-in-out`,
  transform: 'translateX(-110%)',
};

export const burgerBransitionStyles: Record<
  TransitionStatus,
  React.CSSProperties
> = {
  entering: { transform: 'translateX(0)' },
  entered: { transform: 'translateX(0)' },
  exiting: { transform: 'translateX(-110%)' },
  exited: { transform: 'translateX(-110%)' },
  unmounted: {},
};
