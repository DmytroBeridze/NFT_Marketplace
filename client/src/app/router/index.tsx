import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { Marketplace } from '../../pages/Marketplace';
import { Rankings } from '../../pages/Rankings';
import { ConnectWallet } from '../../pages/ConnectWallet';
import { Dashboard } from '../../pages/Dashboard';
import { ProtectedRoute } from '../../shared/routes';

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
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
