import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

export const useInView = ({
  threshold = 0,
  rootMargin = '0px',
  once = true,
}: UseInViewOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        setIsVisible(isIntersecting);

        if (isIntersecting && once) {
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { isVisible, ref };
};
