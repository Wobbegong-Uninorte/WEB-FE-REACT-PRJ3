import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  MenuItem,
} from "@mui/material";
import { FollowUpActivity } from "../types/followups";
import { ContactType } from "../types/clients";

interface FollowUpFormProps {
  onSubmit: (data: FollowUpActivity) => void;
  onCancel: () => void;
  contacts: ContactType[];
}

const FollowUpForm: React.FC<FollowUpFormProps> = ({
  onSubmit,
  onCancel,
  contacts,
}) => {
  const [formData, setFormData] = useState<FollowUpActivity>({
    contactType: "",
    contactDate: "",
    clientContact: contacts[0],
    salesExecutive: "",
    description: "",
    additionalNotes: "",
    opportunityId: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 4, // Espaciado superior
      }}
    >
      <TextField
        select
        label="Tipo de Contacto"
        name="contactType"
        value={formData.contactType}
        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
        required
      >
        <MenuItem value="llamada">Llamada</MenuItem>
        <MenuItem value="correo">Correo</MenuItem>
        <MenuItem value="reunión presencial">Reunión Presencial</MenuItem>
      </TextField>

      <TextField
        label="Fecha de Contacto"
        type="date"
        name="contactDate"
        value={formData.contactDate}
        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
        InputLabelProps={{ shrink: true }}
        required
      />

      <TextField
        select
        label="Contacto del Cliente"
        name="clientContact"
        value={formData.clientContact ? JSON.stringify(formData.clientContact) : ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            clientContact: JSON.parse(e.target.value),
          })
        }
        required
      >
        {contacts.map((contact) => (
          <MenuItem key={contact.email} value={JSON.stringify(contact)}>
            {contact.firstName} {contact.lastName}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Ejecutivo Comercial"
        name="salesExecutive"
        value={formData.salesExecutive}
        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
        required
      />

      <TextField
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
        multiline
        rows={4}
        required
      />

      <TextField
        label="Notas Adicionales"
        name="additionalNotes"
        value={formData.additionalNotes}
        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
        multiline
        rows={4}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default FollowUpForm;
