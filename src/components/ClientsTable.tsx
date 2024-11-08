import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateClient from './UpdateClient';

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

const ClientsTable = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingClientId, setUpdatingClientId] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch('https://web-fe-react-prj3-api.onrender.com/clients');
      if (!response.ok) {
        throw new Error(`Error al obtener los clientes: ${response.statusText}`);
      }
      const data = await response.json();
      setClients(Array.isArray(data) ? data : [data]);
      setError(null);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const toggleClientStatus = async (clientId: string, newStatus: boolean) => {
    setUpdatingClientId(clientId);
    setUpdateError(null);
    
    try {
      const clientToUpdate = clients.find(c => c.id === clientId);
      if (!clientToUpdate) {
        throw new Error('Cliente no encontrado');
      }

      // Crear una copia del cliente con el nuevo estado
      const updatedClient = {
        ...clientToUpdate,
        active: newStatus
      };

      const response = await fetch(`https://web-fe-react-prj3-api.onrender.com/clients/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClient),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al actualizar el estado del cliente');
      }

      // Actualizar el estado local después de una respuesta exitosa
      setClients(prevClients =>
        prevClients.map(client =>
          client.id === clientId ? updatedClient : client
        )
      );
      
      setUpdateError(null);
    } catch (error: any) {
      console.error('Error al actualizar:', error);
      setUpdateError(error.message || 'Error al actualizar el estado del cliente');
    } finally {
      setUpdatingClientId(null);
    }
  };

  const handleClientClick = (client: Client) => {
    localStorage.setItem('selectedClient', JSON.stringify(client));
    navigate('/ClientesDetalleTop');
  };

  const handleUpdateClick = (client: Client) => {
    setSelectedClient(client);
    setShowUpdateModal(true);
  };

  const handleClientUpdate = async (updatedClient: Client) => {
    setUpdatingClientId(updatedClient.id);
    setUpdateError(null);

    try {
      const response = await fetch(`https://web-fe-react-prj3-api.onrender.com/clients/${updatedClient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedClient),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el cliente');
      }

      // Actualizar el estado local después de una actualización exitosa
      setClients(prevClients => 
        prevClients.map(client => 
          client.id === updatedClient.id ? updatedClient : client
        )
      );

      setShowUpdateModal(false);
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      setUpdateError('Error al actualizar el cliente');
    } finally {
      setUpdatingClientId(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-4">Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {updateError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {updateError}
        </div>
      )}

      <div className="overflow-x-auto overflow-y-auto max-h-[500px] max-w-full border border-gray-100 rounded-md shadow-xl scrollbar-custom">
        <table className="table-auto bg-white w-full rounded-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm">
              <th className="py-3 px-4 text-center font-semibold">NIT</th>
              <th className="py-3 px-4 text-center font-semibold">Nombre</th>
              <th className="py-3 px-4 text-center font-semibold">Dirección</th>
              <th className="py-3 px-4 text-center font-semibold">Ciudad</th>
              <th className="py-3 px-4 text-center font-semibold">País</th>
              <th className="py-3 px-4 text-center font-semibold">Teléfono</th>
              <th className="py-3 px-4 text-center font-semibold">Correo</th>
              <th className="py-3 px-4 text-center font-semibold">Estado</th>
              <th className="py-3 px-4 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr 
                key={client.id} 
                className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-sm ${!client.active ? 'text-red-500' : 'text-gray-700'}`}
              >
                <td className="text-center w-[90px]">{client.nit}</td>
                <td className="text-center w-[120px] cursor-pointer hover:text-blue-600 hover:underline" 
                    onClick={() => handleClientClick(client)}>
                  {client.name}
                </td>
                <td className="text-center w-[130px]">{client.address}</td>
                <td className="text-center w-[90px]">{client.city}</td>
                <td className="text-center w-[90px]">{client.country}</td>
                <td className="text-center w-[100px]">{client.phone}</td>
                <td className="text-center w-[200px]">{client.email}</td>
                <td className={`text-center w-[100px] ${client.active ? 'text-green-500' : 'text-red-500'}`}>
                  {client.active ? 'ACTIVO' : 'INACTIVO'}
                </td>
                <td className="text-center py-4 w-[250px]">
                  <div className="flex justify-center gap-2">
                    <button 
                      className="bg-[#FF9800] text-white px-4 py-1 rounded-l-full flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleUpdateClick(client)}
                      disabled={updatingClientId === client.id}
                    >
                      Actualizar
                    </button>
                    <button 
                      className={`${client.active ? 'bg-[#00BCD4]' : 'bg-green-500'} text-white px-4 py-1 rounded-r-full flex items-center justify-center text-sm disabled:opacity-50`}
                      onClick={() => toggleClientStatus(client.id, !client.active)}
                      disabled={updatingClientId === client.id}
                    >
                      {updatingClientId === client.id ? 'Procesando...' : client.active ? 'Inactivar' : 'Activar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUpdateModal && selectedClient && (
        <UpdateClient
          client={selectedClient}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleClientUpdate}
        />
      )}
    </div>
  );
};

export default ClientsTable;