// src/routes/AppRoutes.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import CreateClient from '../pages/CreateClient';

import ClientDetailTop from "../components/ClientDetailTop"

import ClientDetailMid from '../pages/ClientDetailMid';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/clientes/nuevo",
    element: <CreateClient />,
  },
  {
    path: "/ClientesDetalleTop",
    element: <ClientDetailTop/>
  },
  {
    path: "/ClientesDetalle",
    element: <ClientDetailMid/>
  }
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
