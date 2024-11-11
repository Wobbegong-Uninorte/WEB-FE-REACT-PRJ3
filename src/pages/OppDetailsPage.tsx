import React from 'react';
import MainLayout from '../layouts/MainLayout';
import OppDetailsTop_low from "../components/OppDatailsTop";

const OppDetailsPage: React.FC = () => {
    
    return (
        <MainLayout>
            <div className="bg-[#f3f4f6]">
                <h1 className="text-2xl font-bold text-center pt-6">Información de la Oportunidad</h1>
                <OppDetailsTop_low />
            </div>
        </MainLayout>
    );
};

export default OppDetailsPage;
