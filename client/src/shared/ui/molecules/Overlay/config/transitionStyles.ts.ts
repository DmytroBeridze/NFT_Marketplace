import type { TransitionStatus } from 'react-transition-group';

export const MODAL_TRANSITION_DURATION = 300;
export const modalDefaultStyle = {
  transition: `opacity ${MODAL_TRANSITION_DURATION}ms ease-in-out`,
  opacity: 0,
};

export const transitionStyles: Record<TransitionStatus, React.CSSProperties> = {
  entering: { opacity: 1, pointerEvents: 'auto' },
  entered: { opacity: 1, pointerEvents: 'auto' },
  exiting: { opacity: 0, pointerEvents: 'none' },
  exited: { opacity: 0, pointerEvents: 'none' },
  unmounted: { pointerEvents: 'none' },
};
