import { ThemeSwitcher } from '../features/ThemeSwitcher';
import { InnerContainer, OuterContainer } from '../shared/ui/layout';
import { AppProviders } from './providers/AppProviders';

function App() {
  // const [theme, setTheme] = useState<boolean>(true);

  return (
    <div className="App">
      <AppProviders>
        <OuterContainer>
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
        </OuterContainer>
      </AppProviders>
    </div>
  );
}

export default App;
