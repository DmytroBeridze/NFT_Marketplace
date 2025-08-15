import { useCallback, useState } from 'react';

export const usePasswordVisibility = () => {
  const [passVisible, setPassVisible] = useState<{ [key: string]: boolean }>(
    {},
  );

  const togglePasswordVisibility = useCallback((name: string) => {
    setPassVisible((prevstate) => {
      /*
     звертаємся до об1єкта passVisible по ключу name 
    якщо його немаэ, то isVisible ===false 
    це треба для первинного булевого значення в стейті
    */
      const isVisible = prevstate[name] || false;

      return { ...prevstate, [name]: !isVisible };
    });
  }, []);

  // const togglePasswordVisibility = useCallback((name: string) => {
  //   setPassVisible((prevstate) => ({ ...prevstate, [name]: !prevstate[name] }));
  // }, []);

  return {
    passVisible,
    togglePasswordVisibility,
  };
};
