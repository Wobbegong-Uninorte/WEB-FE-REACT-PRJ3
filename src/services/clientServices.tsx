
import { ClientType } from '../types/clients';
import { Opportunities } from "../types/opportunities";

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

export const addOpportunityToClient = async (clientId: number, opportunity: Opportunities) => {
  // Primero obtenemos el cliente actual
  const clientResponse = await fetch(`${API_URL}/clients/${clientId}`);
  if (!clientResponse.ok) {
    throw new Error("Error al obtener el cliente");
  }
  const clientData: ClientType = await clientResponse.json();

  // Agregamos la nueva oportunidad al array de oportunidades
  const updatedClient = {
    ...clientData,
    opportunities: [...(clientData.opportunities || []), opportunity],
  };

  // Hacemos la solicitud para actualizar solo las oportunidades del cliente
  const response = await fetch(`${API_URL}/clients/${clientId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedClient),
  });

  if (!response.ok) {
    throw new Error("Error al agregar la oportunidad al cliente");
  }

  return response.json();
};