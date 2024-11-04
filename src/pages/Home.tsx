// src/pages/Home.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClientsTable from "../components/ClientsTable";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClientClick = () => {
    navigate('/clientes/nuevo'); // Cambia la ruta a '/clientes/nuevo'
  };

  return (
    <div className="flex-column justify-center items-center h-screen">

      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateClientClick}
      >
        Crear Cliente
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/ClientesDetalleTop')}
      >
        Detalle Cliente (Top)
      </Button>
      <ClientsTable />
    </div>
  );
};

export default Home;
