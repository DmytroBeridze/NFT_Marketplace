import { Transition, type TransitionStatus } from 'react-transition-group';
import { useRef, type Ref } from 'react';

interface TransitionWrapperProps {
  children: (props: {
    style: React.CSSProperties;
    ref: Ref<HTMLDivElement>;
  }) => React.ReactNode;
  inProp: boolean;
  duration?: number;
  defaultStyle?: React.CSSProperties;
  transitionStyles: Record<TransitionStatus, React.CSSProperties>;
}

export const TransitionWrapper = ({
  children,
  inProp,
  duration = 300,
  defaultStyle,
  transitionStyles,
}: TransitionWrapperProps) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  return (
    <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
      {(state: TransitionStatus) =>
        children({
          style: {
            ...defaultStyle,
            ...transitionStyles[state],
          },
          ref: nodeRef,
        })
      }
    </Transition>
  );
};
