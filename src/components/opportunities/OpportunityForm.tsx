// src/components/OpportunityForm.tsx

import React from "react";
import { TextField, Box, Button, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material";
import { Opportunities } from "../../types/opportunities";

type Client = {
  id: number;
  name: string;
};

type OpportunityFormProps = {
  opportunity: Opportunities;
  clients: Client[];
  onChange: (updatedOpportunity: Opportunities) => void;
  onSubmit: () => void;
};

const OpportunityForm: React.FC<OpportunityFormProps> = ({ opportunity, clients, onChange, onSubmit }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...opportunity, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target as { name: string; value: string };
    onChange({ ...opportunity, [name]: value });
  };

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <h2>Crear Oportunidad</h2>

      <FormControl fullWidth required>
        <InputLabel>Cliente</InputLabel>
        <Select
          name="client"
          value={opportunity.client}
          onChange={handleSelectChange}
          label="Cliente"
        >
          <MenuItem value="">Seleccionar Cliente</MenuItem>
          {clients.map((client) => (
            <MenuItem key={client.id} value={client.name}>
              {client.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Nombre de Negocio"
        name="businessName"
        value={opportunity.businessName}
        onChange={handleInputChange}
        fullWidth
        required
      />

      <FormControl fullWidth required>
        <InputLabel>Línea de Negocio</InputLabel>
        <Select
          name="businessLine"
          value={opportunity.businessLine}
          onChange={handleSelectChange}
          label="Línea de Negocio"
        >
          <MenuItem value="outsourcing recursos">Outsourcing Recursos</MenuItem>
          <MenuItem value="desarrollo web">Desarrollo Web</MenuItem>
          <MenuItem value="desarrollo mobile">Desarrollo Mobile</MenuItem>
          <MenuItem value="consultoría TI">Consultoría TI</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Descripción"
        name="description"
        value={opportunity.description}
        onChange={handleInputChange}
        multiline
        rows={4}
        fullWidth
      />

      <TextField
        label="Valor Estimado"
        name="estimatedValue"
        type="number"
        value={opportunity.estimatedValue}
        onChange={handleInputChange}
        fullWidth
        required
      />

      <TextField
        label="Fecha Estimada de Realización"
        name="estimatedDate"
        type="date"
        value={opportunity.estimatedDate.toISOString().split("T")[0]}
        onChange={(e) => onChange({ ...opportunity, estimatedDate: new Date(e.target.value) })}
        InputLabelProps={{ shrink: true }}
        fullWidth
        required
      />

      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 4 }}>
        Guardar Oportunidad
      </Button>
    </Box>
  );
};

export default OpportunityForm;
