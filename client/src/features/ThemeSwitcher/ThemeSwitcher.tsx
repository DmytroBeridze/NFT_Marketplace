import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Button } from '../../shared/ui/atoms/Button';

export const ThemeSwitcher = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('ThemeSwitcher must be used within a ThemeProvider');
  }
  const { theme, setTheme } = themeContext;

  const switcher = () => {
    setTheme((prevState) => !prevState);
  };

  useEffect(() => {
    theme
      ? document.body.setAttribute('data-theme', 'dark')
      : document.body.setAttribute('data-theme', 'light');
  }, [theme]);

  return <Button onClick={switcher}>Theme</Button>;
};

export default ThemeSwitcher;
