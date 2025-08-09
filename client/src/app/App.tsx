import { AuthorizationModal } from '../features/AuthorizationModal';
import { InnerContainer, OuterContainer } from '../shared/ui/layout';
import { Header } from '../widgets/Header';
import { AppProviders } from './providers/AppProviders';
import { useAppSelector } from './store/reduxHooks';

function App() {
  return (
    <div className="App">
      <AppProviders>
        <AuthorizationModal />
        {/* {isOpen && <AuthorizationModal />} */}
        <OuterContainer>
          <Header />
          {/* <div id="burger-root"></div> */}
          {/* <InnerContainer>{<div>Content</div>}</InnerContainer> */}
        </OuterContainer>
      </AppProviders>
    </div>
  );
}

export default App;
