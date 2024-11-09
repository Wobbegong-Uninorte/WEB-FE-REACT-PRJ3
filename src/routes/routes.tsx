import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import CreateClient from '../pages/CreateClient';
import ClientDetailTop from "../components/ClientDetailTop";
import ClientDetails from '../pages/ClientDetails';
import OpportunitiesPage from '../pages/OpportunitiesPage'; // Asegúrate de que el nombre y ruta de importación sean correctos

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
    element: <ClientDetailTop />
  },
  {
    path: "/ClientesDetails",
    element: <ClientDetails />
  },
  {
    path: "/OpportunitiesPage", 
    element: <OpportunitiesPage /> 
  }
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
