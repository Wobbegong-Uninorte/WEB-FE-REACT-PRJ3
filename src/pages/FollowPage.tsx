import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { PlusCircle } from 'lucide-react'; 
import { Button } from '@mui/material';
import FollowUpsTable from "../components/followUps/FollowUpsTable";

const FollowPage: React.FC = () => {
    
    return (
        <MainLayout>
            <div> 
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<PlusCircle size={16} />}
                    style={{ paddingLeft: '8px', fontWeight: 'bold'}}
                    >
                    Crear Seguimiento
                </Button> 
                <FollowUpsTable />
            </div>
        </MainLayout>
    );
};

export default FollowPage;
