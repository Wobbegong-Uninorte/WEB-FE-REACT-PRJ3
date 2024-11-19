import { useState } from "react";

interface ClientContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface FollowUpActivity {
  id: string; // Identificador único
  contactType: string;
  contactDate: string;
  clientContact: ClientContact;
  salesExecutive: string;
  description: string;
  additionalNotes?: string;
}

interface FollowUp {
  id: string;
  opportunityId: string;
  followUpActivities: FollowUpActivity[];
}

interface UpdateFollowUpProps {
  followUp: FollowUp;
  activityId: string; // ID de la actividad específica
  onClose: () => void;
  onUpdate: (updatedFollowUp: FollowUp) => void;
}

const UpdateFollowUp: React.FC<UpdateFollowUpProps> = ({
  followUp,
  activityId,
  onClose,
  onUpdate,
}) => {
  const specificActivity = followUp.followUpActivities.find(
    (activity) => activity.id === activityId // Uso correcto de activity.id
  );

  if (!specificActivity) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800">
            Actividad no encontrada
          </h2>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState<FollowUpActivity>(specificActivity);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FollowUpActivity
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ClientContact
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      clientContact: {
        ...prev.clientContact,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const updatedFollowUp: FollowUp = {
        ...followUp,
        followUpActivities: followUp.followUpActivities.map((activity) =>
          activity.id === activityId ? formData : activity // Actualizar actividad específica
        ),
      };

      const response = await fetch(
        `https://web-fe-react-prj3-api.onrender.com/follow/${followUp.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFollowUp),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al actualizar el seguimiento"
        );
      }

      onUpdate(updatedFollowUp);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el seguimiento:", error);
      setError("No se pudo actualizar el seguimiento. Inténtalo de nuevo.");
    }
  };


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Actualizar Actividad de Seguimiento
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Contacto
            </label>
            <input
              type="text"
              value={formData.contactType}
              onChange={(e) => handleInputChange(e, "contactType")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Contacto
            </label>
            <input
              type="date"
              value={formData.contactDate}
              onChange={(e) => handleInputChange(e, "contactDate")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Contacto
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nombre"
                value={formData.clientContact.firstName}
                onChange={(e) => handleContactChange(e, "firstName")}
                className="w-1/2 px-4 py-2 rounded-lg border border-gray-300"
              />
              <input
                type="text"
                placeholder="Apellido"
                value={formData.clientContact.lastName}
                onChange={(e) => handleContactChange(e, "lastName")}
                className="w-1/2 px-4 py-2 rounded-lg border border-gray-300"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFollowUp;
