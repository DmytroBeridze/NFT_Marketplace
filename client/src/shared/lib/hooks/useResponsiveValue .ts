import { useEffect, useState } from 'react';

type BrackpointsType = {
  minWidth: number;
  value: number;
};

export const useResponsiveValue = (
  brackpoints: BrackpointsType[],
  defaultValue: number,
) => {
  const [responsiveValue, setResponsiveValue] = useState(defaultValue);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return defaultValue;
      const sortedPoints = [...brackpoints].sort(
        (a, b) => b.minWidth - a.minWidth,
      );
      const currentValue = sortedPoints.find(
        (data) => window.innerWidth >= data.minWidth,
      );

      currentValue
        ? setResponsiveValue(currentValue.value)
        : setResponsiveValue(defaultValue);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { responsiveValue };
};
