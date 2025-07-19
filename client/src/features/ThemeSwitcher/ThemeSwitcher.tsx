import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const ThemeSwitcher = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('ThemeSwitcher must be used within a ThemeProvider');
  }
  const { theme, setTheme } = themeContext;
  console.log(theme);

  return (
    <div>
      <button
        style={{ fontSize: '2.2rem' }}
        onClick={() => setTheme((prevState) => !prevState)}
      >
        Button Switch
      </button>
    </div>
  );
};

export default ThemeSwitcher;
