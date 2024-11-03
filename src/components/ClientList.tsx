// components/ClientForm.tsx
import React, { useState } from 'react';
import { ClientType } from '../types/clients';

type ClientFormProps = {
  onSubmit: (client: ClientType) => void;
};

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit }) => {
  const [client, setClient] = useState<ClientType>({
    id: undefined,
    nit: '',
    name: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    active: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(client);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-white shadow-md rounded-md space-y-4">
        <h2 className="text-2xl font-semibold text-center">Crear Cliente</h2>
        
        {(['id', 'nit', 'name', 'address', 'city', 'country', 'phone', 'email'] as Array<keyof ClientType>).map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={client[field] as string | number | undefined}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 mt-6 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Crear Cliente
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
