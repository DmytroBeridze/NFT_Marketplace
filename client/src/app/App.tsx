import { useState } from 'react';
import { ThemeSwitcher } from '../features/ThemeSwitcher';
import { ThemeContext } from '../context/ThemeContext';

function App() {
  const [theme, setTheme] = useState<boolean>(true);

  return (
    <div className="App">
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className="bg-red-400 dark:green-400  hover:bg-gray-400 text-5xl font-bold  ">
          Hello project
        </div>
        {/* <div className="bg-general-background text-general-text hover:bg-gray-400 text-5xl font-bold  ">
          Hello project
        </div> */}
        <ThemeSwitcher />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
