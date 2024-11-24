import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import ClientsTable from "../components/ClientsTable";
import MainLayout from '../layouts/MainLayout';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClientClick = () => {
    navigate('/clientes/nuevo'); 
  };

  return (
    <MainLayout>
      <div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<PlusCircle size={16} />}
          onClick={handleCreateClientClick}
          style={{ paddingLeft: '8px', fontWeight: 'bold'}}
        >
          Crear Cliente
        </Button>
        <ClientsTable />
      </div>
    </MainLayout>
  );
};

export default Home;
