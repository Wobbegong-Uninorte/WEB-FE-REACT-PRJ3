import React, { useEffect, useState } from 'react';

interface Opportunity {
    id: string;
    description: string;
    status: string;
    clientId: string;
}

interface FollowUp {
    id: string;
    date: string;
    notes: string;
}

const OpportunityFollowUp: React.FC<{ opportunity: Opportunity; onClose: () => void }> = ({ opportunity, onClose }) => {
    const [followUps, setFollowUps] = useState<FollowUp[]>([]);

    useEffect(() => {
    const sampleFollowUps: FollowUp[] = [
        { id: '1', date: '2023-01-15', notes: 'Reunion inicial con el cliente' },
        { id: '2', date: '2023-01-22', notes: 'Llamada de seguimiento' },
        { id: '3', date: '2023-02-05', notes: 'Demo del producto' },
    ];
    setFollowUps(sampleFollowUps);
    }, [opportunity]);

    return (
        <div className="mt-8 p-6 border-t border-gray-300">
        <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold text-gray-800">Seguimiento de: {opportunity.description}</h4>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded" aria-label="Close">
            &#10005;
            </button>
        </div>
        <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
            <thead className="bg-blue-600 text-white">
            <tr>
                <th className="px-6 py-3 border-b text-left">Fecha</th>
                <th className="px-6 py-3 border-b text-left">Notas</th>
            </tr>
            </thead>
            <tbody>
            {followUps.map((followUp) => (
                <tr key={followUp.id} className="hover:bg-blue-100 transition duration-200">
                <td className="px-6 py-4 border-b text-gray-700">{followUp.date}</td>
                <td className="px-6 py-4 border-b text-gray-700">{followUp.notes}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default OpportunityFollowUp;
