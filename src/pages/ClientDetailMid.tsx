import React, { useEffect, useState } from 'react';

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
  clientId: string; // Relación con el cliente
}

const ClientDetails: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClientId] = useState<string>('3667235'); // ID del cliente específico a mostrar

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://web-fe-react-prj3-api.onrender.com/clients');
        const data = await response.json();
        console.log('API Response:', data);

        if (Array.isArray(data)) {
          setClients(data);
        } else if (data && typeof data === 'object') {
          setClients([data]);
        } else {
          setClients([]);
        }
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
        { id: '3', description: 'Oportunidad 3', status: 'Abierta', clientId: '1234567' }, // Oportunidad para otro cliente
      ];
      setOpportunities(simulatedOpportunities);
    };

    fetchClients();
    fetchOpportunities();
  }, []);

  // Filtramos oportunidades solo para el cliente seleccionado
  const filteredOpportunities = opportunities.filter(opportunity => opportunity.clientId === selectedClientId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Detalle del Cliente</h2>
        {loading ? (
          <p className="text-center text-gray-500">Cargando clientes...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            <h3 className="text-2xl mb-4 text-center text-gray-700">
              Cliente ID: <span className="font-semibold">{selectedClientId}</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-3 border-b text-left">Descripción</th>
                    <th className="px-6 py-3 border-b text-left">Estado</th>
                    <th className="px-6 py-3 border-b text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOpportunities.length > 0 ? (
                    filteredOpportunities.map((opportunity) => (
                      <tr key={opportunity.id} className="hover:bg-blue-100 transition duration-200">
                        <td className="px-6 py-4 border-b text-gray-700">{opportunity.description}</td>
                        <td className="px-6 py-4 border-b text-gray-700">{opportunity.status}</td>
                        <td className="px-6 py-4 border-b text-center">
                          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150">
                            Seguimiento
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 border-b text-center text-gray-500">
                        No hay oportunidades disponibles para este cliente.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientDetails;
