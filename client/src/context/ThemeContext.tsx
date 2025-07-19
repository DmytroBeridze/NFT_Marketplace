import { createContext } from 'react';

interface IThemeContext {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
