import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, UserCircle, Building2, DollarSign, Calendar} from 'lucide-react';
import { IoMdCheckmarkCircle, IoMdCloseCircle } from 'react-icons/io';
import { FaSyncAlt, FaArrowCircleRight } from 'react-icons/fa';
import { AiOutlineFileText } from "react-icons/ai"

import OppDetailsLow from './OppDetailsLow';

interface Opportunity {
    id: string;
    businessName: string;
    businessLine: string;
    description: string;
    estimatedValue: number;
    estimatedDate: string;
    status: string;
}

const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
        case 'GANADA':
            return { icon: <IoMdCheckmarkCircle className="text-green-800" />, bgColor: 'bg-green-100', textColor: 'text-green-800' };
        case 'PERDIDA':
            return { icon: <IoMdCloseCircle className="text-red-800" />, bgColor: 'bg-red-100', textColor: 'text-red-800' };
        case 'EN PROCESO':
            return { icon: <FaSyncAlt className="text-blue-800 animate-spin" />, bgColor: 'bg-blue-100', textColor: 'text-blue-800' };
        case 'CANCELADA':
            return { icon: <FaArrowCircleRight className="text-gray-800" />, bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
        default:
            return { icon: <FaArrowCircleRight className="text-gray-800" />, bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
    }
};

const OppDetailsTop: React.FC = () => {
    const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
    const navigate = useNavigate();

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
        <div className="container mx-auto p-4 bg-[#f3f4f6]">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a la lista
            </button>

            <Card className="w-full">
                <CardHeader className="bg-gray-50 border-b">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <UserCircle className="mr-2 text-blue-500" aria-label="Icono de información del cliente" />
                            <h2 className="text-xl font-semibold">Oportunidad: {opportunity.businessName}</h2>
                        </div>

                        <div className="flex-shrink-0">
                            {(() => {
                                const statusStyle = getStatusStyle(opportunity.status); 
                                return (
                                    <span
                                        className={`inline-flex items-center justify-center px-3 py-2 rounded-full text-xs font-semibold ${statusStyle.textColor} ${statusStyle.bgColor}`}
                                        role="status"
                                        aria-label={`Estado: ${opportunity.status}`}
                                    >
                                        {statusStyle.icon}
                                        <span className="ml-1">{opportunity.status}</span>
                                    </span>
                                );
                            })()}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    <div className="flex items-start space-x-3">
                        <Building2 className="w-6 h-6 text-gray-500" />
                        <div>
                            <p className="text-gray-500 text-sm">Línea de Negocio</p>
                            <p className="font-medium">{opportunity.businessLine}</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <DollarSign className="w-6 h-6 text-gray-500 animate-pulse" />
                        <div>
                            <p className="text-gray-500 text-sm">Valor Estimado</p>
                            <p className="font-medium">${opportunity.estimatedValue.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <Calendar className="w-6 h-6 text-gray-500 animate-spin-slow" />
                        <div>
                            <p className="text-gray-500 text-sm">Fecha Estimada</p>
                            <p className="font-medium">{new Date(opportunity.estimatedDate).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <AiOutlineFileText className="w-12 h-12 text-gray-500 animate-wiggle" />
                        <div>
                            <p className="text-gray-500 text-sm">Descripción</p>
                            <p className="font-medium leading-relaxed">{opportunity.description}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div id="follow-up-section" className="mt-6 transition-transform ease-in-out duration-300 transform">
                <OppDetailsLow />
            </div>
        </div>
    );
};

export default OppDetailsTop;
