import { createContext } from 'react';

interface IThemeContext {
  theme: 'dark' | 'light';
  setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
// export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
