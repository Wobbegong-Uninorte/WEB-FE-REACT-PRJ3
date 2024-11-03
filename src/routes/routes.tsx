// src/routes/AppRoutes.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import CreateClient from '../pages/CreateClient';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/clientes/nuevo",
    element: <CreateClient />,
  }
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
