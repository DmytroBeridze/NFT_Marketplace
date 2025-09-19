import { useEffect, useRef, useState } from 'react';
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
  const mounted = useRef(false);
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
 і перевірка щоб не викликати повторний запит при першому монтуванні
  коли ще не завантажився юзер, або користувач- гість 
 */
  useEffect(() => {
    if (!userTheme) return;

    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setThemeInBase();
  }, [theme, userTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
