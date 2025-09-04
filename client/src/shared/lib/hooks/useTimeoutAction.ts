import { useEffect } from 'react';

// interface UseTimeoutActionProps<T> {
//   dependence: T;
//   time?: number;
//   action: () => void;
// }

export const useTimeoutAction = <T>(
  dependence: T,
  action: () => void,
  time = 2000,
) => {
  useEffect(() => {
    if (!dependence) return;

    const timer = setTimeout(() => {
      action();
    }, time);

    return () => clearTimeout(timer);
  }, [dependence, action, time]);
};
