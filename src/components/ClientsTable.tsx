const ClientsTable = () => {
  const clients = [
    { id: 1, nit: '123456789', name: 'Empresa XYZ', address: 'Calle 1 #123', city: 'Bogotá', country: 'Colombia', phone: '+57 123 4567890', email: 'contacto@empresa.xyz', status: 'ACTIVO' },
    { id: 2, nit: '987654321', name: 'Empresa ABC', address: 'Calle 2 #234', city: 'Medellín', country: 'Colombia', phone: '+57 234 5678901', email: 'contacto@empresa.abc', status: 'INACTIVO' },
    { id: 3, nit: '456789123', name: 'Empresa XXX', address: 'Calle 3 #345', city: 'Cali', country: 'Colombia', phone: '+57 345 6789012', email: 'contacto@empresa.xxx', status: 'ACTIVO' },
    { id: 4, nit: '321654987', name: 'Empresa DEF', address: 'Calle 4 #456', city: 'Barranquilla', country: 'Colombia', phone: '+57 456 7890123', email: 'contacto@empresa.def', status: 'ACTIVO' },
    { id: 5, nit: '789123456', name: 'Empresa GHI', address: 'Calle 5 #567', city: 'Cartagena', country: 'Colombia', phone: '+57 567 8901234', email: 'contacto@empresa.ghi', status: 'INACTIVO' },
    { id: 6, nit: '654987321', name: 'Empresa JKL', address: 'Calle 6 #678', city: 'Pereira', country: 'Colombia', phone: '+57 678 9012345', email: 'contacto@empresa.jkl', status: 'ACTIVO' },
    { id: 7, nit: '987321654', name: 'Empresa MNO', address: 'Calle 7 #789', city: 'Manizales', country: 'Colombia', phone: '+57 789 0123456', email: 'contacto@empresa.mno', status: 'INACTIVO' },
    { id: 8, nit: '123789456', name: 'Empresa PQR', address: 'Calle 8 #890', city: 'Bucaramanga', country: 'Colombia', phone: '+57 890 1234567', email: 'contacto@empresa.pqr', status: 'ACTIVO' },
    { id: 9, nit: '789456123', name: 'Empresa STU', address: 'Calle 9 #901', city: 'Cúcuta', country: 'Colombia', phone: '+57 901 2345678', email: 'contacto@empresa.stu', status: 'ACTIVO' },
    { id: 10, nit: '456123789', name: 'Empresa VWX', address: 'Calle 10 #012', city: 'Santa Marta', country: 'Colombia', phone: '+57 012 3456789', email: 'contacto@empresa.vwx', status: 'INACTIVO' },
  ];

  return (
    <div className="flex justify-center p-4">
      <div className="overflow-x-auto overflow-y-auto max-h-[500px] max-w-full border border-gray-100 rounded-md shadow-xl scrollbar-custom">
        <table className="table-auto bg-white w-[1400px] rounded-md">
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
                <td className={`text-center w-[100px] ${client.status === 'ACTIVO' ? 'text-green-500' : 'text-gray-700'}`}>
                  {client.status}
                </td>
                <td className="text-center py-4 w-[150px]">
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
