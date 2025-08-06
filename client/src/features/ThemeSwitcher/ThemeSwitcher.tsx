import { useEffect } from 'react';
import { useTheme } from '../../shared/lib/theme/useTheme';
import { ThemeSelect } from '../../shared/ui/atoms/ThemeSelect';

export const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useTheme();

  useEffect(() => {
    if (theme === false) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return <ThemeSelect toggleTheme={toggleTheme} />;
};

export default ThemeSwitcher;
