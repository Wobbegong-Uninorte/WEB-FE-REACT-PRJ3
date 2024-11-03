import React, { useEffect, useState } from 'react';

interface Client {
  id: string; // Cambia a string porque el ID en tu ejemplo es un string
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
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
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
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
        setError('Error al cargar los datos'); 
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center p-4">
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
              <tr key={client.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-sm`}>
                <td className="text-center w-[90px]">{client.nit}</td>
                <td className="text-center w-[120px]">{client.name}</td>
                <td className="text-center w-[130px]">{client.address}</td>
                <td className="text-center w-[90px]">{client.city}</td>
                <td className="text-center w-[90px]">{client.country}</td>
                <td className="text-center w-[100px]">{client.phone}</td>
                <td className="text-center w-[200px]">{client.email}</td>
                <td className={`text-center w-[100px] ${client.active ? 'text-green-500' : 'text-gray-700'}`}>
                  {client.active ? 'ACTIVO' : 'INACTIVO'}
                </td>
                <td className="text-center py-4 w-[250px]">
                  <div className="flex justify-center">
                    <button className="bg-[#FF9800] text-white px-4 py-1 rounded-l-full flex items-center justify-center text-sm">
                      Actualizar
                    </button>
                    <button className="bg-[#00BCD4] text-white px-4 py-1 rounded-r-full flex items-center justify-center text-sm">
                      Inactivar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientsTable;
