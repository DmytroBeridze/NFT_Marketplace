import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './app/styles/index.css';
import App from './app/App.tsx';
import './shared/config/i18n/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
