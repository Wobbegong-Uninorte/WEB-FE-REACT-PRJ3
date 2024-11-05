// src/pages/Home.tsx
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClientClick = () => {
    navigate('/clientes/nuevo'); 
  };

  return (
    <div >
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateClientClick}
      >
        Crear Cliente
      </Button>
    </div>
  );
};

export default Home;
