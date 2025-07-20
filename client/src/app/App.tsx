import { useState } from 'react';
import { ThemeSwitcher } from '../features/ThemeSwitcher';
import { ThemeContext } from '../context/ThemeContext';

function App() {
  const [theme, setTheme] = useState<boolean>(true);

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div style={{ fontSize: '2.2rem' }}>Hello project </div>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
