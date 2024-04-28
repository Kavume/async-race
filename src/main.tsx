import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, useRouteError, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

export function ErrorBoundary() {
  const error = useRouteError() as Error;
  console.error(error);
  return <div>{error.message}</div>;
}

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    errorElement: <ErrorBoundary />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
