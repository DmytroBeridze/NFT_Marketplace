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
    document.documentElement.classList.toggle('dark');
  }, [theme]);

  return (
    <>
      <Button
        variant="primary"
        onClick={switcher}
        className="px-12 py-5  font-work-sans-regular  "
      >
        <div> Get Started</div>
      </Button>
    </>
  );
};

export default ThemeSwitcher;
