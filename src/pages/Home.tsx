// src/pages/Home.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ClientsTable from "../components/ClientsTable";
import MainLayout from '../layouts/MainLayout'

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClientClick = () => {
    navigate('/clientes/nuevo'); 
  };

  return (
    <MainLayout>
      <div> {/* Contenedor agregado para evitar el error de estructura JSX */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateClientClick}
          >
            Crear Cliente
          </Button>
          <ClientsTable />
      </div>
    </MainLayout>
  );
};

export default Home;
