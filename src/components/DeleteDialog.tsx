// DeleteDialog.tsx
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

interface DeleteDialogProps {
  itemId: string;
  itemDescription: string;
  itemType: 'opportunity' | 'activity';
  onDelete: (id: string) => void;
  triggerClassName?: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  itemId,
  itemDescription,
  itemType,
  onDelete,
  triggerClassName = "p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
}) => {
  const handleDelete = () => {
    onDelete(itemId);
  };

  const messages = {
    opportunity: {
      title: "¿Confirmar eliminación de oportunidad?",
      description: `¿Está seguro que desea eliminar la oportunidad "${itemDescription}"? Esta acción también eliminará todo el seguimiento asociado y no se puede deshacer.`
    },
    activity: {
      title: "¿Confirmar eliminación de actividad?",
      description: `¿Está seguro que desea eliminar la actividad de seguimiento "${itemDescription}"? Esta acción no se puede deshacer.`
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className={triggerClassName}>
          <Trash2 className="h-5 w-5" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{messages[itemType].title}</AlertDialogTitle>
          <AlertDialogDescription>
            {messages[itemType].description}
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

export default DeleteDialog;