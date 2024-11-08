import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface DeleteOpportunityDialogProps {
  opportunityId: string;
  opportunityDescription: string;
  onDelete: (id: string) => void;
}

const DeleteOpportunityDialog: React.FC<DeleteOpportunityDialogProps> = ({
  opportunityId,
  opportunityDescription,
  onDelete
}) => {
  const handleDelete = () => {
    onDelete(opportunityId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors">
          <Trash2 className="h-5 w-5" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Está seguro que desea eliminar la oportunidad "{opportunityDescription}"? 
            Esta acción también eliminará todo el seguimiento asociado y no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteOpportunityDialog;