import React from 'react';
import ClientDetailTop from "../components/clients/ClientDetailTop"
import ClientDetailMid from "../components/clients/ClientDetailMid"
import MainLayout from '../layouts/MainLayout'

const ClientDetailPage: React.FC = () => {
    return (
        <MainLayout>
            <div className="bg-[#f3f4f6]">
                <h1 className="text-2xl font-bold text-center pt-6">Detalles del Cliente</h1>
                <ClientDetailTop />
                <ClientDetailMid />
            </div>
        </MainLayout>

    );
};

export default ClientDetailPage;
