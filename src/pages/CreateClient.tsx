// src/pages/CreateClient.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientForm from '../components/clients/ClientForm';
import { createClient } from '../services/clientServices';
import { ClientType } from '../types/clients';
import MainLayout from '../layouts/MainLayout';

const CreateClient: React.FC = () => {
  const navigate = useNavigate();

  const initialClientState: ClientType = {
    id: 0,
    nit: '',
    name: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    active: true,
    contacts: [],
  };

  const [client, setClient] = useState<ClientType>(initialClientState);

  const handleClientChange = (updatedClient: ClientType) => {
    setClient(updatedClient);
  };

  const handleCreateClient = async () => {
    try {
      await createClient(client);
      alert('Cliente y contactos creados con éxito');
      navigate('/'); // Redirige a la página de inicio
    } catch (error) {
      console.log("Error creando cliente: ", error);
    }
  };

  return (
    <MainLayout> 
      <ClientForm client={client} onChange={handleClientChange} onSubmit={handleCreateClient} />
    </MainLayout>
  );
};

export default CreateClient;
