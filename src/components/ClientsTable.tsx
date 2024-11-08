import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'tailwindcss/tailwind.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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

  const [currentPage, setCurrentPage] = useState(0);
  const resultsPerPage = 8;

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
      console.log('Datos recibidos:', data);

      if (Array.isArray(data)) {
        setClients(data);
      } else {
        setClients([data]);
      }
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

      console.log('Enviando actualización:', clientToUpdate);

      const response = await fetch('https://web-fe-react-prj3-api.onrender.com/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...clientToUpdate,
          active: newStatus
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al actualizar el estado del cliente');
      }

      const responseData = await response.json();
      console.log('Respuesta de la API:', responseData);

      setClients(prevClients =>
        prevClients.map(client =>
          client.id === clientId
            ? { ...client, active: newStatus }
            : client
        )
      );
      
      await fetchClients();
      
      setUpdateError(null);
    } catch (error) {
      console.error('Error al actualizar:', error);
      setUpdateError(`Error al actualizar el estado del cliente`);
    } finally {
      setUpdatingClientId(null);
    }
  };

  const handleClientClick = (client: Client) => {
    localStorage.setItem('selectedClient', JSON.stringify(client));
    navigate('/ClientesDetails');
  };

  const currentClients = clients.slice(
    currentPage * resultsPerPage,
    (currentPage + 1) * resultsPerPage
  );

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
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

    {/* Contenedor con scroll horizontal */}
    <div className="overflow-x-auto w-full border border-gray-100 rounded-md shadow-xl">
      <table className="table-auto bg-white min-w-[800px] rounded-md"> {/* Cambié w-full por min-w-[800px] */}
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
          {currentClients.map((client, index) => (
            <tr 
              key={client.id} 
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-sm ${!client.active ? 'text-red-500' : 'text-gray-700'}`}
            >
              <td className="text-center w-[90px]">{client.nit}</td>
              <td className="text-center w-[120px] cursor-pointer hover:text-blue-600 hover:underline" onClick={() => handleClientClick(client)}>{client.name}</td>
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
                    disabled={!client.active || updatingClientId === client.id}
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
    
    <ReactPaginate
      previousLabel={<FaArrowLeft />} 
      nextLabel={<FaArrowRight />} 
      pageCount={Math.ceil(clients.length / resultsPerPage)}
      onPageChange={handlePageChange}
      containerClassName={'pagination flex mt-4 space-x-2 overflow-auto'}
      pageClassName={'px-3 py-1 bg-gray-200 rounded'}
      activeClassName={'bg-blue-600 text-white font-semibold border border-blue-700'}
      previousClassName={'mt-2 rounded'}
      nextClassName={'mt-2 rounded'}
      disabledClassName={'opacity-50 cursor-not-allowed'}
    />
  </div>
  );
};

export default ClientsTable;
