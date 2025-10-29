import { useEffect } from 'react';
import { useTheme } from '../../../shared/lib/theme/useTheme';
import { ThemeSelect } from '../../../shared/ui/atoms';

interface ThemeSwitcherProps {
  bgColor?: string;
}

export const ThemeSwitcher = ({ bgColor }: ThemeSwitcherProps) => {
  const { theme } = useTheme();

  // тема відправляється не в body а в cookie яка встаеовлена в ThemeProvider

  // useEffect(() => {
  //   setTheme();
  // }, [theme]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return <ThemeSelect bgColor={bgColor} />;
  // return <ThemeSelect toggleTheme={toggleTheme} bgColor={bgColor} />;
};

export default ThemeSwitcher;
