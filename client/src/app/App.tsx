import { useGetMeQuery } from '../entities/user/model';
import { AuthorizationModal } from '../features/AuthorizationModal';
import { AuthorizationContextProvider } from '../features/AuthorizationModal/context';
import { InnerContainer, OuterContainer } from '../shared/ui/layout';
import { Overlay } from '../shared/ui/molecules/Overlay';
import { Header } from '../widgets/Header';
import { AppProviders } from './providers/AppProviders';
import { useAppSelector } from './store/reduxHooks';
import { Outlet } from 'react-router-dom';

function App() {
  const modalType = useAppSelector((store) => store.overlay.openModalType);
  const {} = useGetMeQuery();

  return (
    <div className="App">
      <AppProviders>
        <Overlay modalType={'authorization'}>
          {modalType === 'authorization' && (
            <AuthorizationContextProvider>
              <AuthorizationModal />
            </AuthorizationContextProvider>
          )}
        </Overlay>

        {/* {isOpen && <Overlay />} */}
        <OuterContainer>
          <Header />
          <main>
            {/* <div id="burger-root"></div> */}
            {/* <InnerContainer> */}
            <Outlet />
            {/* </InnerContainer> */}
          </main>
        </OuterContainer>
      </AppProviders>
    </div>
  );
}

export default App;
