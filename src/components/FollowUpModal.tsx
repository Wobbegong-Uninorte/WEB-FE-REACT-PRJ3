import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import FollowUpForm from "./FollowUpForm";
import { FollowUpActivity } from "../types/followups";
import { ContactType, ClientType } from "../types/clients";
import { fetchClients } from "../services/clientServices";

interface FollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FollowUpActivity) => void;
  opportunityId: string;
  contacts: ContactType[];
}

const FollowUpModal: React.FC<FollowUpModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  opportunityId,
}) => {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      setIsLoading(true);
      try {
        const clients: ClientType[] = await fetchClients();

        // Busca el cliente que tenga esta oportunidad
        const client = clients.find((client) =>
          client.opportunities?.some(opportunity => opportunity.id === opportunityId)
        );

        if (client) {
          setContacts(client.contacts || []);
        } else {
          console.warn("No se encontró un cliente asociado a la oportunidad.");
          setContacts([]);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
        setContacts([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadContacts();
    }
  }, [isOpen, opportunityId]);


  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Crear Actividad de Seguimiento</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <CircularProgress />
            <p>Cargando contactos...</p>
          </Box>
        ) : (
          <FollowUpForm onSubmit={onSubmit} onCancel={onClose} contacts={contacts} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FollowUpModal;