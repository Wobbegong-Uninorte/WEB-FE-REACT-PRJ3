import React from 'react';
import ClientDetailTop from "../components/ClientDetailTop"
import ClientDetailMid from "../components/ClientDetailMid"

const ClientDetailPage: React.FC = () => {
    return (
        <div className="bg-[#f3f4f6]">
        <h1 className="text-2xl font-bold text-center pt-6">Detalles del Cliente</h1>
        <ClientDetailTop />
        <ClientDetailMid />
        </div>
    );
};

export default ClientDetailPage;
