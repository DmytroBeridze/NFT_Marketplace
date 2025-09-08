import { useCallback, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, setTheme } = themeContext;

  const toggleTheme = useCallback(() => {
    setTheme((prevState) => (prevState === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);
  // const toggleTheme = useCallback(() => {
  //   setTheme((prevState) => !prevState);
  // }, [setTheme]);

  return { toggleTheme, theme };
};
