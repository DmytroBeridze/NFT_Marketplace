import { useEffect } from 'react';
import { AuthorizationModal } from '../features/AuthorizationModal';
import { AuthorizationContextProvider } from '../features/AuthorizationModal/context';
import { Icon } from '../shared/ui/atoms/Icon';
import { InnerContainer, OuterContainer } from '../shared/ui/layout';
import { Overlay } from '../shared/ui/molecules/Overlay';
import { Header } from '../widgets/Header';
import { AppProviders } from './providers/AppProviders';
import { useAppSelector } from './store/reduxHooks';
import { useGetMeQuery } from '../features/AuthorizationModal/model';

function App() {
  const modalType = useAppSelector((store) => store.overlay.openModalType);
  const { data, error, isLoading } = useGetMeQuery();
  // const data = useAppSelector((store) => store.user.data);
  // Пока идёт проверка токена — рендерим лоадер
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

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
          <main>
            {data ? <div>COntent</div> : <div>Login please</div>}

            {/* <div id="burger-root"></div> */}
            {/* <InnerContainer>{<div>Content</div>}</InnerContainer> */}
          </main>
        </OuterContainer>
      </AppProviders>
    </div>
  );
}

export default App;
