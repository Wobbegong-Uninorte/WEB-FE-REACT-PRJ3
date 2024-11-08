import React, { useEffect, useState } from 'react';
import SeguimientoOportunidad from './ClientDetailLow';

interface Client {
  id: string;
  nit: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  active: boolean;
}

interface Opportunity {
  id: string;
  description: string;
  status: string;
  clientId: string;
}

const ClientDetails: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClientId] = useState<string>('3667235');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [showFollowUp, setShowFollowUp] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://web-fe-react-prj3-api.onrender.com/clients');
        const data = await response.json();
        setClients(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setError('No se pudieron cargar los clientes.');
      } finally {
        setLoading(false);
      }
    };

    const fetchOpportunities = async () => {
      const simulatedOpportunities: Opportunity[] = [
        { id: '1', description: 'Oportunidad 1', status: 'Abierta', clientId: '3667235' },
        { id: '2', description: 'Oportunidad 2', status: 'Cerrada', clientId: '3667235' },
        { id: '3', description: 'Oportunidad 3', status: 'Abierta', clientId: '1234567' },
      ];
      setOpportunities(simulatedOpportunities);
    };

    fetchClients();
    fetchOpportunities();
  }, []);

  const filteredOpportunities = opportunities.filter(opportunity => opportunity.clientId === selectedClientId);

  const handleFollowUpClick = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowFollowUp(true);
  };

  const handleCloseFollowUp = () => {
    setShowFollowUp(false);
    setSelectedOpportunity(null);
  };

  return (
    <div className="container mx-auto p-4 bg-[#f3f4f6]">
      <div className="w-full bg-white rounded-lg shadow-md">
        <div className="bg-gray-50 border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Oportunidades de negocio</h2>
        </div>
        {loading ? (
          <p className="p-4">Cargando clientes...</p>
        ) : error ? (
          <p className="p-4 text-red-500">{error}</p>
        ) : (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <span className="w-5 h-5 text-gray-500">{/* Icono de ciudad aquí */}</span>
              <div>
                <p className="text-sm text-gray-500">Ciudad</p>
                <p className="font-medium">{clients[0]?.city}</p>
              </div>
            </div>
          </div>
        )}
        <div className="p-6">
          <table className="w-full border-t">
            <thead>
              <tr>
                <th className="p-2 text-left text-sm font-semibold text-gray-600">Descripción</th>
                <th className="p-2 text-left text-sm font-semibold text-gray-600">Estado</th>
                <th className="p-2 text-left text-sm font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map((opportunity) => (
                  <tr key={opportunity.id} className="border-b">
                    <td className="p-2">{opportunity.description}</td>
                    <td className="p-2">{opportunity.status}</td>
                    <td className="p-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleFollowUpClick(opportunity)}
                        aria-expanded={showFollowUp}
                        aria-controls="follow-up-section"
                      >
                        Seguimiento
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    No hay oportunidades disponibles para este cliente.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {showFollowUp && selectedOpportunity && (
            <div id="follow-up-section" className="mt-4">
              <SeguimientoOportunidad opportunity={selectedOpportunity} onClose={handleCloseFollowUp} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
