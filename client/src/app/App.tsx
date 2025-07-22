import { useState } from 'react';
import { ThemeSwitcher } from '../features/ThemeSwitcher';
import { ThemeContext } from '../context/ThemeContext';

function App() {
  const [theme, setTheme] = useState<boolean>(true);

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className="bg-avocado text-mint-500 hover:bg-gray-400 text-5xl font-bold ">
          Hello project{' '}
        </div>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
