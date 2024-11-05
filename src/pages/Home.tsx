// src/pages/Home.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClientsTable from "../components/ClientsTable";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClientClick = () => {
    navigate('/clientes/nuevo'); 
  };

  return (

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


      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/ClientesDetalle')}
      >
        Detalle Cliente (Intermedio)
      </Button>


      <ClientsTable />
    </div>
  
  );
};

export default Home;
