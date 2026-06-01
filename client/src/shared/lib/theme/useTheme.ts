import { useCallback, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { useLocalStorage } from '../hooks';

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  const { setLocal } = useLocalStorage();

  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, setTheme } = themeContext;

  // useEffect(() => {
  //   setLocal('theme', theme);
  // }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevState) => {
      const next = prevState === 'dark' ? 'light' : 'dark';
      setLocal('theme', next);
      return next;
    });
  }, [setTheme]);
  // const toggleTheme = useCallback(() => {
  //   setTheme((prevState) => (prevState === 'dark' ? 'light' : 'dark'));
  // }, [setTheme]);

  return { toggleTheme, theme };
};
