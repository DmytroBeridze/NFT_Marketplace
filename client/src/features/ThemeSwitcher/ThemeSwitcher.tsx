import { useEffect } from 'react';
import { useTheme } from '../../shared/lib/theme/useTheme';
import { ThemeSelect } from '../../shared/ui/atoms/ThemeSelect';

export const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle('dark');
  }, [theme]);

  return <ThemeSelect toggleTheme={toggleTheme} />;
};

export default ThemeSwitcher;
