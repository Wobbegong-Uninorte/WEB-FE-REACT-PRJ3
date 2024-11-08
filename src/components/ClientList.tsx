// src/components/ClientForm.tsx
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white shadow-lg rounded-md space-y-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800">Crear Cliente</h2>
          
          {(['id', 'nit', 'name', 'address', 'city', 'country', 'phone', 'email'] as Array<keyof ClientType>).map((field) => (
            <div key={field} className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700 capitalize">{field}</label>
              <input
                type="text"
                name={field}
                value={client[field] as string | number | undefined}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:border-gray-600"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          >
            Crear Cliente
          </button>
        </form>
      </div>
  );
};

export default ClientForm;
