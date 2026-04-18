import { useGetMeQuery } from '../entities/user/model';
import { AuthorizationModal } from '../features/AuthorizationModal';
import { AuthorizationContextProvider } from '../features/AuthorizationModal/context';
import { InnerContainer, OuterContainer } from '../shared/ui/layout';
import { Overlay } from '../shared/ui/molecules/Overlay';
import { Header } from '../widgets/Header';
import { AppProviders } from './providers/AppProviders';
import { useAppSelector } from './store/reduxHooks';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Spinner } from '../shared/ui/atoms';
import { Footer } from '../widgets/Footer';
import ScrollToTopButton from '../shared/ui/atoms/ScrollToTopButton/ScrollToTopButton';

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
            {/* <div>
              <Spinner wrapperClassName="flex justify-center items-center" />
            </div> */}
            <Suspense
              fallback={
                <div className="w-full h-screen bg-primary-background-color">
                  <Spinner
                    wrapperClassName="flex justify-center items-center"
                    fill={`var(--hover-primary-accent-color)`}
                  />
                </div>
              }
            >
              {/* <Suspense fallback={<div>Lading page...</div>}> */}
              <AuthorizationContextProvider>
                <Outlet />
              </AuthorizationContextProvider>
            </Suspense>
            {/* </InnerContainer> */}
          </main>
          <Footer />
        </OuterContainer>
        <ScrollToTopButton />
      </AppProviders>
    </div>
  );
}

export default App;
