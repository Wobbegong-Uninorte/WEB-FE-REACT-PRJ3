import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react'; // Asegúrate de tener instalado lucide-react para los iconos
import ClientsTable from "../components/clients/ClientsTable";
import MainLayout from '../layouts/MainLayout';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClientClick = () => {
    navigate('/clientes/nuevo'); 
  };

  return (
    <MainLayout>
      <div> {/* Contenedor agregado para evitar el error de estructura JSX */}
        <Button
          variant="contained" // Contained da un estilo sólido, similar al predeterminado
          color="primary"
          size="small" // Tamaño pequeño para igualarlo al botón anterior
          startIcon={<PlusCircle size={16} />} // Agrega el icono al inicio, de 16px como en el otro código
          onClick={handleCreateClientClick}
          style={{ paddingLeft: '8px', fontWeight: 'bold'}} // Espaciado a la izquierda para igualar el estilo del botón
        >
          Crear Cliente
        </Button>
        <ClientsTable />
      </div>
    </MainLayout>
  );
};

export default Home;
