import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import UpdateFollowUp from "./UpdateFollowUp";

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

const FollowUpsTable = () => {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const resultsPerPage = 8;

  // Estados para la modal de edición
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  useEffect(() => {
    fetchFollowUps();
  }, []);

  // Función para obtener los datos de seguimientos
  const fetchFollowUps = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://web-fe-react-prj3-api.onrender.com/follow");
      if (!response.ok) {
        throw new Error(`Error al obtener los seguimientos: ${response.statusText}`);
      }

      const data = await response.json();
      setFollowUps(Array.isArray(data) ? data : [data]); // Asegura consistencia en la estructura
    } catch (err) {
      console.error("Error al obtener los seguimientos:", err);
      setError("No se pudo cargar la información. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteActivity = async (followUpId: string, activityId: string) => {
    // Actualizar el estado localmente antes de realizar la solicitud
    setFollowUps(prevFollowUps =>
      prevFollowUps.map(followUp =>
        followUp.id === followUpId
          ? {
              ...followUp,
              followUpActivities: followUp.followUpActivities.filter(activity => activity.id !== activityId),
            }
          : followUp
      )
    );
  
    try {
      // Realizar la solicitud al servidor
      const response = await fetch(`https://web-fe-react-prj3-api.onrender.com/follow/${followUpId}/activities/${activityId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Error al eliminar del servidor: ${response.status} ${response.statusText}`);
      }
  
      console.log('Actividad eliminada del servidor con éxito');
    } catch (error) {
      // Manejar errores del servidor y revertir cambios si es necesario
      console.error('Error al eliminar la actividad del servidor:', error);
      setError('No se pudo sincronizar la eliminación con el servidor. Por favor, intente de nuevo.');
    }
  };

  // Manejo de clic para actualizar una actividad específica
  const handleUpdateClick = (followUp: FollowUp, activityId: string) => {
    console.log("FollowUp seleccionado:", followUp);
    console.log("Activity ID seleccionado:", activityId);
    setSelectedFollowUp(followUp);
    setSelectedActivityId(activityId);
    setShowUpdateModal(true);
  };

  // Paginación: Seleccionar elementos actuales
  const currentFollowUps = followUps.slice(
    currentPage * resultsPerPage,
    (currentPage + 1) * resultsPerPage
  );

  // Cambiar página
  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  // Renderizar loading, error o tabla
  if (loading) {
    return <div className="flex justify-center p-4">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center p-4 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="overflow-x-auto overflow-y-auto max-w-full border border-gray-100 rounded-md shadow-xl scrollbar-custom">
        <table className="table-auto bg-white w-full rounded-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm">
              <th className="py-3 px-4 text-center font-semibold">Tipo de Contacto</th>
              <th className="py-3 px-4 text-center font-semibold">Fecha de Contacto</th>
              <th className="py-3 px-4 text-center font-semibold">Datos del Cliente</th>
              <th className="py-3 px-4 text-center font-semibold">Ejecutivo</th>
              <th className="py-3 px-4 text-center font-semibold">Descripción</th>
              <th className="py-3 px-4 text-center font-semibold">Notas</th>
              <th className="py-3 px-4 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentFollowUps.map((followUp) =>
              followUp.followUpActivities.map((activity, index) => (

                <tr
                  key={activity.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } text-sm text-gray-700`}
                >
                  <td className="py-4 px-2 text-center">{activity.contactType}</td>
                  <td className="py-4 px-2 text-center">{activity.contactDate}</td>
                  <td className="py-4 px-2 text-left">
                    <ul className="list-none">
                      <li><strong>Nombre:</strong> {activity.clientContact.firstName} {activity.clientContact.lastName}</li>
                      <li><strong>Email:</strong> {activity.clientContact.email}</li>
                      <li><strong>Teléfono:</strong> {activity.clientContact.phone}</li>
                    </ul>
                  </td>
                  <td className="py-4 px-2 text-center">{activity.salesExecutive}</td>
                  <td className="py-4 px-2 text-center">{activity.description}</td>
                  <td className="py-4 px-2 text-center">{activity.additionalNotes || "N/A"}</td>
                  <td className="py-4 px-2 text-center">
  <div className="flex justify-center gap-1">
    <button
      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
      onClick={() => handleUpdateClick(followUp, activity.id)} // Actualizar
    >
      Actualizar
    </button>
    <button
  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
  onClick={() => handleDeleteActivity(followUp.id, activity.id)}
>
  Eliminar
</button>
  </div>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={<FaArrowLeft />}
        nextLabel={<FaArrowRight />}
        pageCount={Math.ceil(followUps.length / resultsPerPage)}
        onPageChange={handlePageChange}
        containerClassName="pagination flex mt-4 space-x-2 overflow-auto justify-center items-center"
        pageClassName="px-3 py-1 rounded-md transition-all duration-200 ease-in-out"
        activeClassName="bg-blue-500 text-white font-semibold border border-blue-600"
        previousClassName="rounded-md px-2 py-1 text-gray-600 hover:text-blue-500 transition duration-200 ease-in-out"
        nextClassName="rounded-md px-2 py-1 text-gray-600 hover:text-blue-500 transition duration-200 ease-in-out"
      />

{showUpdateModal && selectedFollowUp && selectedActivityId && (
  <UpdateFollowUp
    key={`${selectedFollowUp.id}-${selectedActivityId}`} // Asegura un re-render único
    followUp={selectedFollowUp}
    activityId={selectedActivityId}
    onClose={() => {
      setShowUpdateModal(false);
      setSelectedFollowUp(null);
      setSelectedActivityId(null);
    }}
    onUpdate={() => fetchFollowUps()}
  />
)}

    </div>
  );
};

export default FollowUpsTable;
