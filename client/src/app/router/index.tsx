import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { Marketplace } from '../../pages/Marketplace';
import { Rankings } from '../../pages/Rankings';
import { ConnectWallet } from '../../pages/ConnectWallet';
import { Dashboard } from '../../pages/Dashboard';
import { ProtectedRoute } from '../../shared/routes';
import { AuthorCollection } from '../../pages/AuthorCollection';
import { Gallery } from '../../pages/Gallery';
import AuthorPage from '../../pages/AuthorPage/AuthorPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Marketplace },
      // { path: 'marketplace', Component: Marketplace },
      { path: 'rankings', Component: Rankings },
      { path: 'connectWallet', Component: ConnectWallet },
      {
        element: <ProtectedRoute />,
        children: [{ path: 'dashboard', Component: Dashboard }],
      },
      { path: 'collection/:galleryId', Component: AuthorCollection },
      { path: 'gallery', Component: Gallery },
      { path: 'authorPage/:authorId', Component: AuthorPage },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
