import { useState } from 'react';
import { ThemeSwitcher } from '../features/ThemeSwitcher';
import { ThemeContext } from '../context/ThemeContext';
import { InnerContainer, OuterContainer } from '../shared/ui/layout';

function App() {
  const [theme, setTheme] = useState<boolean>(true);

  return (
    <div className="App">
      <OuterContainer>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <InnerContainer>
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
          </InnerContainer>

          <ThemeSwitcher />
        </ThemeContext.Provider>
      </OuterContainer>
    </div>
  );
}

export default App;
