import React, { useState, useEffect } from "react";
import {
  FaClipboardList,
  FaRegCalendarAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaDollarSign,
  FaCalendarDay,
} from "react-icons/fa";
import FollowUpModal from "../followUps/FollowUpModal";
import DeleteDialog from "../dialogs/DeleteDialog";
import {Button} from "@mui/material";
import {PlusCircle} from 'lucide-react';
import { ContactType } from "../../types/clients";

interface Opportunity {
  id: string;
  businessName: string;
  businessLine: string;
  description: string;
  estimatedValue: number;
  estimatedDate: string;
  status: string;
  clientId?: number;
}

interface FollowUpActivity {
  id: string;
  contactType: string;
  contactDate: string;
  clientContact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  salesExecutive: string;
  description: string;
  additionalNotes: string;
}

const OppDetailsLow: React.FC = () => {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [followUps, setFollowUps] = useState<FollowUpActivity[]>([]);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const savedOpportunity = localStorage.getItem("selectedOpportunity");
    if (savedOpportunity) {
      const opportunityData = JSON.parse(savedOpportunity);
      setOpportunity(opportunityData);
      fetchFollowUps(opportunityData.id);
      fetchContacts(opportunityData.clientId);
    }
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const fetchFollowUps = async (opportunityId: string) => {
    try {
      const response = await fetch(`https://web-fe-react-prj3-api.onrender.com/follow`);
      const data = await response.json();
      const followUpData = data.find((follow: any) => follow.opportunityId === opportunityId);
      setFollowUps(followUpData ? followUpData.followUpActivities : []);
    } catch (error) {
      console.error("Error fetching follow-up activities:", error);
      setError("Error al cargar los seguimientos");
    }
  };

  const fetchContacts = async (clientId: number) => {
    try {
      const response = await fetch(`https://web-fe-react-prj3-api.onrender.com/clients/${clientId}`);
      const data = await response.json();
      setContacts(data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Error al cargar los contactos");
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    if (!opportunity) return;
    
    try {
      // Obtener todos los follow-ups actuales
      const response = await fetch(`https://web-fe-react-prj3-api.onrender.com/follow`);
      const data = await response.json();
      const followUpData = data.find((follow: any) => follow.opportunityId === opportunity.id);
      
      if (!followUpData) return;

      // Crear versión actualizada sin la actividad específica
      const updatedFollowUp = {
        ...followUpData,
        followUpActivities: followUpData.followUpActivities.filter(
          (activity: FollowUpActivity) => activity.id !== activityId
        )
      };

      // Actualizar en el servidor
      const updateResponse = await fetch(
        `https://web-fe-react-prj3-api.onrender.com/follow/${followUpData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFollowUp),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Error al eliminar la actividad");
      }

      // Actualizar estado local
      setFollowUps(prevFollowUps => 
        prevFollowUps.filter(activity => activity.id !== activityId)
      );
      
      setToastMessage("Actividad eliminada correctamente");
      setShowToast(true);
    } catch (error) {
      console.error("Error al eliminar la actividad:", error);
      setError("No se pudo eliminar la actividad");
    }
  };

  const handleCreateFollowUp = (newFollowUp: FollowUpActivity) => {
    setFollowUps((prev) => [...prev, newFollowUp]);
    setIsFollowUpModalOpen(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case "GANADA":
        return <FaCheckCircle className="text-green-600" />;
      case "PERDIDA":
        return <FaExclamationCircle className="text-red-600" />;
      case "EN PROCESO":
        return <FaRegCalendarAlt className="text-blue-600" />;
      default:
        return <FaRegCalendarAlt className="text-gray-600" />;
    }
  };

  if (!opportunity) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No se encontró información de la oportunidad</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-xl">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <FaClipboardList className="mr-3 text-blue-600 text-2xl" />
          <h4 className="text-xl font-semibold flex items-center">
            Seguimiento de: {opportunity.businessLine}
          </h4>
        </div>
        <Button
          onClick={() => setIsFollowUpModalOpen(true)}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<PlusCircle size={16} />}
          style={{ paddingLeft: '8px', fontWeight: 'bold'}}
        >
          Crear Seguimiento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center space-x-2">
          <FaDollarSign className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Valor Estimado:
          </span>
          <span className="text-sm font-semibold text-green-600">
            ${opportunity.estimatedValue.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <FaCalendarDay className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Fecha inicio:
          </span>
          <span className="text-sm font-semibold text-blue-600">
            {opportunity.estimatedDate}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        {getStatusIcon(opportunity.status)}
        <span
          className={`font-semibold text-lg ${opportunity.status === "GANADA"
            ? "text-green-600"
            : opportunity.status === "PERDIDA"
              ? "text-red-600"
              : "text-blue-600"
            }`}
        >
          {opportunity.status}
        </span>
      </div>

      <div className="hidden lg:block">
        <table className="w-full border-t bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left text-sm font-semibold">Fecha</th>
              <th className="p-4 text-left text-sm font-semibold">
                Tipo de Contacto
              </th>
              <th className="p-4 text-left text-sm font-semibold">Ejecutivo</th>
              <th className="p-4 text-left text-sm font-semibold">
                Contacto del Cliente
              </th>
              <th className="p-4 text-left text-sm font-semibold">
                Descripción
              </th>
              <th className="p-4 text-left text-sm font-semibold">
                Notas Adicionales
              </th>
              <th className="p-4 text-left text-sm font-semibold">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {followUps.map((followUp, index) => (
              <tr
                key={followUp.id}
                className={`hover:bg-gray-200 transition duration-300 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 text-sm text-gray-700">
                  {followUp.contactDate}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {followUp.contactType}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {followUp.salesExecutive}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {`${followUp.clientContact.firstName} ${followUp.clientContact.lastName}`}
                  <br />
                  <a
                    href={`mailto:${followUp.clientContact.email}`}
                    className="text-blue-600 underline"
                  >
                    {followUp.clientContact.email}
                  </a>
                  <br />
                  <span>{followUp.clientContact.phone}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {followUp.description}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {followUp.additionalNotes}
                </td>
                <td className="px-4 py-3 text-sm">
                  <DeleteDialog
                    itemId={followUp.id}
                    itemDescription={`${followUp.contactType} - ${followUp.contactDate}`}
                    itemType="activity"
                    onDelete={() => handleDeleteActivity(followUp.id)}
                    triggerClassName="bg-red-600 text-white px-3 py-1 rounded-full flex items-center justify-center text-sm hover:bg-red-700 transition-colors duration-200"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="block lg:hidden">
        <div className="space-y-4">
          {followUps.map((followUp) => (
            <div key={followUp.id} className="bg-white border border-gray-300 rounded-lg shadow-sm p-4">
              <div className="mb-2 text-xs font-semibold text-gray-500 uppercase">
                {followUp.contactDate}
              </div>
              <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
                <p className="mr-4">
                  <strong>Tipo:</strong> {followUp.contactType}
                </p>
                <p>
                  <strong>Ejecutivo:</strong> {followUp.salesExecutive}
                </p>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <p>
                  <strong>Contacto del Cliente:</strong>
                </p>
                <p>{`${followUp.clientContact.firstName} ${followUp.clientContact.lastName}`}</p>
                <a
                  href={`mailto:${followUp.clientContact.email}`}
                  className="text-blue-600 underline text-xs"
                >
                  {followUp.clientContact.email}
                </a>
                <p className="text-xs">{followUp.clientContact.phone}</p>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <p>
                  <strong>Descripción:</strong> {followUp.description}
                </p>
              </div>
              <div className="text-sm text-gray-700 mb-4">
                <p>
                  <strong>Notas Adicionales:</strong> {followUp.additionalNotes}
                </p>
              </div>
              <div className="flex justify-end">
                <DeleteDialog
                  itemId={followUp.id}
                  itemDescription={`${followUp.contactType} - ${followUp.contactDate}`}
                  itemType="activity"
                  onDelete={() => handleDeleteActivity(followUp.id)}
                  triggerClassName="bg-red-600 text-white px-3 py-1 rounded-full flex items-center justify-center text-sm hover:bg-red-700 transition-colors duration-200"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <FollowUpModal
        isOpen={isFollowUpModalOpen}
        onClose={() => setIsFollowUpModalOpen(false)}
        onSubmit={handleCreateFollowUp}
        contacts={contacts}
        opportunityId={opportunity.id}
      />

      {showToast && (
        <div className="fixed mt-20 top-4 right-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg transition-all transform duration-500 ease-in-out z-50">
          {toastMessage} 🎉
        </div>
      )}
    </div>
  );
};

export default OppDetailsLow;