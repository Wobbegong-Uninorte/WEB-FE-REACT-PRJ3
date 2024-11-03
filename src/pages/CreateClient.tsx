// src/pages/CreateClient.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClientForm from '../components/ClientList';
import { createClient } from '../services/clientServices';
import { ClientType } from '../types/clients';

const CreateClient: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClient = async (client: ClientType) => {
    try {
      await createClient(client);
      alert('Cliente creado con éxito');
      navigate('/'); // Redirige de vuelta a la página de inicio después de crear el cliente
    } catch (error) {
      console.log("Error creando cliente: ", error);
    }
  };

  return <ClientForm onSubmit={handleCreateClient} />;
};

export default CreateClient;
