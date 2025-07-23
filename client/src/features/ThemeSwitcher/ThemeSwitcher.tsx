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
    document.documentElement.classList.remove('theme-dark', 'theme-light');

    theme
      ? document.documentElement.classList.add('theme-dark')
      : document.documentElement.classList.add('theme-light');
  }, [theme]);

  return (
    <>
      <Button onClick={switcher} className="px-5 py-7">
        <div> {theme ? 'light' : 'dark'}</div>
      </Button>
    </>
  );
};

export default ThemeSwitcher;
