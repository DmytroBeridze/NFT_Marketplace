import type { TransitionStatus } from 'react-transition-group';

export const BURGER_TRANSITION_DURATION = 300;

export const defaultStyle = {
  transition: `transform ${BURGER_TRANSITION_DURATION}ms ease-in-out`,
  transform: 'translateX(-110%)',
};

export const transitionStyles: Record<TransitionStatus, React.CSSProperties> = {
  entering: { transform: 'translateX(0)' },
  entered: { transform: 'translateX(0)' },
  exiting: { transform: 'translateX(-110%)' },
  exited: { transform: 'translateX(-110%)' },
  unmounted: {},
};
