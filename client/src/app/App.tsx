import { AuthorizationModal } from '../features/AuthorizationModal';
import { AuthorizationContextProvider } from '../features/AuthorizationModal/context';
import { Icon } from '../shared/ui/atoms/Icon';
import { InnerContainer, OuterContainer } from '../shared/ui/layout';
import { Overlay } from '../shared/ui/molecules/Overlay';
import { Header } from '../widgets/Header';
import { AppProviders } from './providers/AppProviders';
import { useAppSelector } from './store/reduxHooks';

function App() {
  const modalType = useAppSelector((store) => store.overlay.openModalType);
  return (
    <div className="App">
      <AppProviders>
        <Overlay>
          {modalType === 'authorization' && (
            <AuthorizationContextProvider>
              <AuthorizationModal />
            </AuthorizationContextProvider>
          )}
        </Overlay>

        {/* {isOpen && <Overlay />} */}
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
