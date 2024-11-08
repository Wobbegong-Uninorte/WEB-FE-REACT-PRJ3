import { useState } from 'react';

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

interface UpdateClientProps {
  client: Client;
  onClose: () => void;
  onUpdate: (updatedClient: Client) => void;
}

const UpdateClient: React.FC<UpdateClientProps> = ({ client, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Client>(client);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Cambiar el método a PUT para actualizar el cliente
      const response = await fetch(`https://web-fe-react-prj3-api.onrender.com/clients/${client.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el cliente');
      }

      onUpdate(formData); // Actualiza el cliente en ClientsTable
      onClose();          // Cierra el modal

      // Refrescar la página inmediatamente
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      setError('No se pudo actualizar el cliente. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[600px]">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Actualizar Cliente</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-1">NIT</label>
              <input
                type="text"
                name="nit"
                value={formData.nit}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full mb-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Nombre Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full mb-2"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-600 mb-1">Dirección</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full mb-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Ciudad</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full mb-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">País</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full mb-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full mb-2"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Teléfono</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-3 rounded-lg w-full mb-2"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClient;
