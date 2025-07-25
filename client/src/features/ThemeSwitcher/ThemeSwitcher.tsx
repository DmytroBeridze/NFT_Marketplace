import { useEffect } from 'react';
import { Button } from '../../shared/ui/atoms/Button';
import { useTheme } from '../../shared/lib/theme/useTheme';

export const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle('dark');
  }, [theme]);

  return (
    <>
      <Button
        variant="primary"
        onClick={toggleTheme}
        className="px-12 py-5  font-work-sans-regular  "
      >
        <div> Get Started</div>
      </Button>
    </>
  );
};

export default ThemeSwitcher;
