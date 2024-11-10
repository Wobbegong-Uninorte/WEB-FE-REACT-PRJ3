import React, { useEffect, useState } from 'react';
import { FaClipboardList, FaTimes, FaRegCalendarAlt, FaCheckCircle, FaExclamationCircle, FaDollarSign, FaCalendarDay } from 'react-icons/fa';

interface Opportunity {
    id: string;
    description: string;
    status: string;
    businessName: string;
    businessLine: string;
    estimatedValue: number;
    estimatedDate: string;
    clientId: string;
}

interface FollowUp {
    id: string;
    date: string;
    notes: string;
    followUpType: string; // E.g. Call, Meeting, Email
}

const ClientDetailLow: React.FC<{ opportunity: Opportunity; onClose: () => void }> = ({ opportunity, onClose }) => {
    const [followUps, setFollowUps] = useState<FollowUp[]>([]);

    useEffect(() => {
        const sampleFollowUps: FollowUp[] = [
            { id: '1', date: '2023-01-15', notes: 'Reunión inicial con el cliente', followUpType: 'Reunión' },
            { id: '2', date: '2023-01-22', notes: 'Llamada de seguimiento', followUpType: 'Llamada' },
            { id: '3', date: '2023-02-05', notes: 'Demo del producto', followUpType: 'Demo' },
        ];
        setFollowUps(sampleFollowUps);
    }, [opportunity]);

    const getStatusIcon = (status: string) => {
        switch (status.toUpperCase()) {
            case 'GANADA':
                return <FaCheckCircle className="text-green-600" />;
            case 'PERDIDA':
                return <FaExclamationCircle className="text-red-600" />;
            case 'EN PROCESO':
                return <FaRegCalendarAlt className="text-blue-600" />;
            default:
                return <FaRegCalendarAlt className="text-gray-600" />;
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <FaClipboardList className="mr-3 text-blue-600 text-2xl" />
                    <h4 className="text-xl font-semibold">Seguimiento de: {opportunity.businessLine}</h4>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-2"
                    aria-label="Cerrar"
                >
                    <FaTimes className="text-xl" />
                </button>
            </div>

            {/* Información de la oportunidad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-2">
                    <FaDollarSign className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Valor Estimado:</span>
                    <span className="text-sm font-semibold text-green-600">${opportunity.estimatedValue.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FaCalendarDay className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Fecha Estimada:</span>
                    <span className="text-sm font-semibold text-blue-600">{opportunity.estimatedDate}</span>
                </div>
            </div>

            {/* Estado de la oportunidad */}
            <div className="flex items-center space-x-2 mb-6">
                {getStatusIcon(opportunity.status)}
                <span className={`font-semibold text-lg ${opportunity.status === 'GANADA' ? 'text-green-600' : opportunity.status === 'PERDIDA' ? 'text-red-600' : 'text-blue-600'}`}>
                    {opportunity.status}
                </span>
            </div>

            {/* Tabla de Seguimientos */}
            <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gray-50 text-gray-600">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Fecha</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Tipo de Seguimiento</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Notas</th>
                    </tr>
                </thead>
                <tbody>
                    {followUps.map((followUp) => (
                        <tr key={followUp.id} className="hover:bg-gray-200 transition duration-300">
                            <td className="px-4 py-3 text-sm text-gray-700">{followUp.date}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{followUp.followUpType}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{followUp.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientDetailLow;
