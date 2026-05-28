import { useGetMeQuery } from '../entities/user/model';
import { AuthorizationModal } from '../features/AuthorizationModal';
import { AuthorizationContextProvider } from '../features/AuthorizationModal/context';
import { OuterContainer } from '../shared/ui/layout';
import { Overlay } from '../shared/ui/molecules/Overlay';
import { Header } from '../widgets/Header';
import { AppProviders } from './providers/AppProviders';
import { useAppSelector } from './store/reduxHooks';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Spinner } from '../shared/ui/atoms';
import { Footer } from '../widgets/Footer';
import ScrollToTopButton from '../shared/ui/atoms/ScrollToTopButton/ScrollToTopButton';
import { ScrollToTop } from './providers/ScrollToTop';
import { WalletInstallModal } from '../widgets/WalletInstall';
import { WalletContextProvider } from '../pages/ConnectWallet/context/connectWalletContext';

function App() {
  const modalType = useAppSelector((store) => store.overlay.openModalType);
  // const {} = useGetMeQuery();
  const token = localStorage.getItem('token');
  useGetMeQuery(undefined, { skip: !token });

  return (
    <div className="App bg-primary-background-color min-h-screen">
      {/* <div className="App h-screen flex flex-col overflow-hidden"> */}
      <AppProviders>
        <ScrollToTop />
        <WalletContextProvider>
          <AuthorizationContextProvider>
            <Overlay modalType={'authorization'}>
              {modalType === 'authorization' && <AuthorizationModal />}
            </Overlay>

            <Overlay modalType={'wallet'}>
              {modalType === 'wallet' && <WalletInstallModal />}
            </Overlay>

            <OuterContainer>
              <Header />

              <main className="">
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
                  <Outlet />
                </Suspense>
                {/* </InnerContainer> */}
              </main>
              <Footer />
            </OuterContainer>
          </AuthorizationContextProvider>
        </WalletContextProvider>
        <ScrollToTopButton />
      </AppProviders>
    </div>
  );
}

export default App;
