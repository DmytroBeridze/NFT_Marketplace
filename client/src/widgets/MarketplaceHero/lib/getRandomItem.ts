import { useEffect, useState } from 'react';

// !-----------------------🔨-Перевірити чи використовується, якщо  ні- видалити

export const useRandomItem = <T>(
  arr: T[],
): { randomElement: T | undefined; updateRandom: () => void } => {
  const [randomElement, setRandomElement] = useState<T | undefined>();

  const updateRandom = () => {
    if (arr.length === 0) return;
    const index = Math.floor(Math.random() * arr.length);
    setRandomElement(arr[index]);
  };
  useEffect(() => {
    updateRandom();
  }, [arr]);

  return { randomElement, updateRandom };
};
