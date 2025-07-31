import { InnerContainer, OuterContainer } from '../shared/ui/layout';
import { Header } from '../widgets/Header';
import { AppProviders } from './providers/AppProviders';

function App() {
  // const [theme, setTheme] = useState<boolean>(true);

  return (
    <div className="App">
      <AppProviders>
        <OuterContainer>
          <Header />
          {/* <InnerContainer>{<div>Content</div>}</InnerContainer> */}
        </OuterContainer>
      </AppProviders>
    </div>
  );
}

export default App;
