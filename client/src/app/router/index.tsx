import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import App from '../App';

const Marketplace = lazy(() => import('../../pages/Marketplace'));
const Rankings = lazy(() => import('../../pages/Rankings'));
const ConnectWallet = lazy(() => import('../../pages/ConnectWallet'));
const AuthorCollection = lazy(() => import('../../pages/AuthorCollection'));
const Gallery = lazy(() => import('../../pages/Gallery'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));

// import Dashboard from '../../pages/Dashboard';
import AuthorPage from '../../pages/AuthorPage/AuthorPage';
import { ProtectedRoute } from '../../shared/routes';
import AuthorizationPage from '../../pages/AuthorizationPage/AuthorizationPage';
import { NotFoundPage } from '../../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Marketplace },
      // { path: 'marketplace', Component: Marketplace },
      { path: 'rankings', Component: Rankings },
      {
        element: <ProtectedRoute />,
        children: [{ path: 'dashboard', Component: Dashboard }],
      },
      { path: 'collection/:galleryId', Component: AuthorCollection },
      { path: 'gallery', Component: Gallery },
      { path: 'authorPage/:authorId', Component: AuthorPage },
      { path: 'auth', Component: AuthorizationPage },
      { path: 'connectWallet', Component: ConnectWallet },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
