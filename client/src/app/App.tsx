import { useState } from 'react';
import { ThemeSwitcher } from '../features/ThemeSwitcher';
import { ThemeContext } from '../context/ThemeContext';

function App() {
  const [theme, setTheme] = useState<boolean>(true);

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div
          className="
          font-space-mono-bold 
          text-base 
          bg-primary-background-color 
          text-primary-text-color 
          bg-hover-primary-accent-color   "
        >
          Hello project
        </div>

        <ThemeSwitcher />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
