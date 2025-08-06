import { useEffect } from 'react';
import { useTheme } from '../../shared/lib/theme/useTheme';
import { ThemeSelect } from '../../shared/ui/atoms/ThemeSelect';

interface ThemeSwitcherProps {
  bgColor?: string;
}

export const ThemeSwitcher = ({ bgColor }: ThemeSwitcherProps) => {
  const { theme } = useTheme();
  // const { toggleTheme, theme } = useTheme();

  useEffect(() => {
    if (theme === false) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return <ThemeSelect bgColor={bgColor} />;
  // return <ThemeSelect toggleTheme={toggleTheme} bgColor={bgColor} />;
};

export default ThemeSwitcher;
