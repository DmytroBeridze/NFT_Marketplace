import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './app/store/index.ts';

import './app/styles/index.css';
import App from './app/App.tsx';
import './shared/config/i18n/i18n';
import { AppRouter } from './app/router/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
      {/* App в як кореневий компонент в app/router  React Router Dom */}
      {/* <App /> */}
    </Provider>
  </StrictMode>,
);
