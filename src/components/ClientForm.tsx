import React, { useState } from 'react';
import { TextField, Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { ClientType, ContactType } from '../types/clients';

type ClientFormProps = {
  client: ClientType;
  onChange: (updatedClient: ClientType) => void;
  onSubmit: () => void;
};

const ClientForm: React.FC<ClientFormProps> = ({ client, onChange, onSubmit }) => {
  const [contact, setContact] = useState<ContactType>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [contacts, setContacts] = useState<ContactType[]>(client.contacts || []);

  // Maneja los cambios en los campos del cliente
  const handleClientInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...client, [name]: value });
  };

  // Maneja los cambios en los campos del contacto
  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  // Añade el contacto al arreglo de contactos y limpia el formulario de contacto
  const handleAddContact = () => {
    setContacts([...contacts, contact]);
    setContact({ firstName: '', lastName: '', email: '', phone: '' });
    onChange({ ...client, contacts: [...contacts, contact] }); // Actualiza el estado de contactos en el cliente
  };

  // Maneja el cambio del checkbox de activo
  const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...client, active: e.target.checked });
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <h2>Crear Cliente</h2>

      {/* Campos del Cliente */}
      <TextField label="ID" name="id" type="number" value={client.id} onChange={handleClientInputChange} fullWidth required />
      <TextField label="NIT" name="nit" type="number" value={client.nit} onChange={handleClientInputChange} fullWidth required />
      <TextField label="Nombre" name="name" type="text" value={client.name} onChange={handleClientInputChange} fullWidth required />
      <TextField label="Dirección" name="address" type="text" value={client.address} onChange={handleClientInputChange} fullWidth required />
      <TextField label="Ciudad" name="city" type="text" value={client.city} onChange={handleClientInputChange} fullWidth required />
      <TextField label="País" name="country" type="text" value={client.country} onChange={handleClientInputChange} fullWidth required />
      <TextField label="Teléfono" name="phone" type="tel" value={client.phone} onChange={handleClientInputChange} fullWidth required />
      <TextField label="Correo Electrónico" name="email" type="email" value={client.email} onChange={handleClientInputChange} fullWidth required />
      <FormControlLabel
        control={<Checkbox checked={client.active} onChange={handleActiveChange} />}
        label="Activo"
      />

      {/* Sección para Agregar Contactos */}
      <h3>Agregar Contacto</h3>
      <TextField label="Nombre" name="firstName" type="text" value={contact.firstName} onChange={handleContactInputChange} fullWidth required />
      <TextField label="Apellido" name="lastName" type="text" value={contact.lastName} onChange={handleContactInputChange} fullWidth required />
      <TextField label="Correo Electrónico" name="email" type="email" value={contact.email} onChange={handleContactInputChange} fullWidth required />
      <TextField label="Teléfono" name="phone" type="tel" value={contact.phone} onChange={handleContactInputChange} fullWidth required />
      
      <Button variant="outlined" onClick={handleAddContact} sx={{ marginTop: 2 }}>
        Agregar Contacto
      </Button>

      {/* Lista de Contactos Agregados */}
      {contacts.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <h4>Lista de Contactos:</h4>
          <ul>
            {contacts.map((c, index) => (
              <li key={index}>{`${c.firstName} ${c.lastName} - ${c.email} - ${c.phone}`}</li>
            ))}
          </ul>
        </Box>
      )}

      {/* Botón para Guardar Cliente y Contactos */}
      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 4 }}>
        Guardar Cliente y Contactos
      </Button>
    </Box>
  );
};

export default ClientForm;
