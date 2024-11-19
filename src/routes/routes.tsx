import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import CreateClient from '../pages/CreateClient';
import ClientDetailTop from "../components/ClientDetailTop";
import ClientDetails from '../pages/ClientDetails';
import OpportunitiesPage from '../pages/OpportunitiesPage'; // Asegúrate de que el nombre y ruta de importación sean correctos
import CreateOpportunity from '../components/CreateOpportunity'; // Asegúrate de que el nombre y ruta de importación sean correctos
import OpportunityDetailsPage from '../pages/OppDetailsPage';
import Dashboard from '../pages/Dashboard';
import FollowPage from "../pages/FollowPage";


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
  },
  {
    path: "/oportunidad/nueva", 
    element: <CreateOpportunity /> 
  },
  {
    path: "/OppDetailsPage", 
    element: <OpportunityDetailsPage /> 
  },
  {
    path: "/Dashboard",
    element: <Dashboard />
  },
  {
    path: "/FollowPage", 
    element: <FollowPage /> 
  },

]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
