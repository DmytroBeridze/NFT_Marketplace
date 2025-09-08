import { useEffect, useState } from 'react';
import { ThemeContext } from '../../shared/lib/theme/ThemeContext';
import Cookies from 'js-cookie';
import { useAppSelector } from '../store/reduxHooks';
interface ThemeProviderProps {
  children: React.ReactNode;
}
type Theme = 'dark' | 'light';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const userTheme = useAppSelector((state) => state.user.data?.theme);

  const [theme, setTheme] = useState<Theme>(
    () => (Cookies.get('theme') as Theme) || 'dark',
  );

  useEffect(() => {
    if (userTheme) {
      setTheme(userTheme as Theme);
    }
  }, [userTheme]);

  useEffect(() => {
    Cookies.set('theme', theme, { expires: 30 });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
