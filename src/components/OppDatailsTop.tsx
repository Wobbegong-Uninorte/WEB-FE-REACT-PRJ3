import React, { useState, useEffect } from 'react';

interface Opportunity {
    id: string;
    businessName: string;
    businessLine: string;
    description: string;
    estimatedValue: number;
    estimatedDate: string;
    status: string;
}

const OpportunityDetailsPage: React.FC = () => {
    const [opportunity, setOpportunity] = useState<Opportunity | null>(null);

    useEffect(() => {
        const savedOpportunity = localStorage.getItem('selectedOpportunity');
        if (savedOpportunity) {
        setOpportunity(JSON.parse(savedOpportunity));
        }
    }, []);

    if (!opportunity) {
        return (
        <div className="flex justify-center items-center h-screen">
            <p>No se encontró información de la oportunidad</p>
        </div>
        );
    }

    return (
        <div>
        {/* Renderizar los detalles de la oportunidad aquí */}
        <h2>Detalles de la Oportunidad: {opportunity.businessName}</h2>
        <p>Descripción: {opportunity.description}</p>
        <p>Valor Estimado: {opportunity.estimatedValue}</p>
        <p>Estado: {opportunity.status}</p>
        {/* Otros detalles adicionales */}
        </div>
    );
};

export default OpportunityDetailsPage;
