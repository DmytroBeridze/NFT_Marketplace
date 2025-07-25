import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, setTheme } = themeContext;

  const toggleTheme = () => {
    setTheme((prevState) => !prevState);
  };

  return { toggleTheme, theme };
};
