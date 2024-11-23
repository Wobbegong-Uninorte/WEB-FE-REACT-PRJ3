import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react'; 
import MainLayout from '../layouts/MainLayout';
import OpportunitiesTable from '../components/opportunities/OpportunitiesTable';

const OpportunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCreateClientClick = () => {
    navigate('/oportunidad/nueva'); 
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
          Crear Oportunidad
        </Button> 
        <OpportunitiesTable />
      </div>
    </MainLayout>
  );
};

export default OpportunitiesPage;
