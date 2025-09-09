import { useEffect, useState } from 'react';
import { ThemeContext } from '../../shared/lib/theme/ThemeContext';
import Cookies from 'js-cookie';
import { useAppSelector } from '../store/reduxHooks';
import { useSetThemeMutation } from '../../entities/user/model';
interface ThemeProviderProps {
  children: React.ReactNode;
}
type Theme = 'dark' | 'light';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const userTheme = useAppSelector((state) => state.user.data?.theme);
  const [setThemeInBase] = useSetThemeMutation();
  const [theme, setTheme] = useState<Theme>(
    () => (Cookies.get('theme') as Theme) || 'dark',
  );

  useEffect(() => {
    Cookies.set('theme', theme, { expires: 30 });
  }, [theme]);

  useEffect(() => {
    if (userTheme) {
      setTheme(userTheme as Theme);
    }
  }, [userTheme]);

  /*
 запит на зміну теми в базі при переключенні на фронті
 і перевірка щоб не викликати повторний запит при монтуванні
  коли ще не завантажився юзер, або користувач- гість 
 */
  useEffect(() => {
    if (!userTheme) return;
    if (userTheme !== theme) {
      setThemeInBase();
    }
  }, [theme, userTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
