
import { ClientType } from '../types/clients';

const API_URL = 'https://web-fe-react-prj3-api.onrender.com';

export const createClient = async (client: ClientType) => {
  const response = await fetch(`${API_URL}/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  });

  if (!response.ok) {
    throw new Error('Error al crear el cliente');
  }

  return response.json();
};