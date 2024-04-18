import './App.scss';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { Layout } from './components/Layout';
import './colors.scss';

const GaragePage = lazy(() => import('./pages/GaragePage/GaragePage'));
const WinnersPage = lazy(() => import('./pages/WinnersPage/WinnersPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  return (
    <>
      {
          useRoutes([
            {
              path: '/',
              element: <Layout />,
              children: [
                { index: true, element: <GaragePage/> },
                { path: '/winners', element: <WinnersPage/> },
                { path: '*', element: <NotFoundPage /> },
              ],
            },
          ])
      }
    </>
  );
}

export default App;