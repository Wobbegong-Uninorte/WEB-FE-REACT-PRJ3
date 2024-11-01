import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  }
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
}

export default AppRoutes;