import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

interface Tracking {
  id: number;
  contactType: 'llamada' | 'correo' | 'reunión presencial';
  contactDate: string;
  clientContact: string;
  salesExecutive: string;
  description: string;
}

const TrackingTable: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const resultsPerPage = 8;
  

  const trackings: Tracking[] = [
    {
      id: 1,
      contactType: 'llamada',
      contactDate: '2024-03-15',
      clientContact: 'Juan Pérez',
      salesExecutive: 'Ana García',
      description: 'Cliente interesado en servicios de desarrollo web. Solicita cotización detallada.'
    },
    {
      id: 2,
      contactType: 'correo',
      contactDate: '2024-03-14',
      clientContact: 'María Rodríguez',
      salesExecutive: 'Carlos López',
      description: 'Envío de propuesta técnica para proyecto de consultoría.'
    },
    {
      id: 3,
      contactType: 'reunión presencial',
      contactDate: '2024-03-13',
      clientContact: 'Pedro Sánchez',
      salesExecutive: 'Laura Martínez',
      description: 'Reunión de seguimiento para definir alcance del proyecto mobile.'
    },
    {
      id: 4,
      contactType: 'llamada',
      contactDate: '2024-03-12',
      clientContact: 'Carmen Torres',
      salesExecutive: 'Diego Ramírez',
      description: 'Seguimiento a cotización enviada. Cliente solicita ajustes en cronograma.'
    },
    {
      id: 5,
      contactType: 'correo',
      contactDate: '2024-03-11',
      clientContact: 'Roberto Díaz',
      salesExecutive: 'Ana García',
      description: 'Envío de documentación adicional solicitada para proyecto de outsourcing.'
    }
  ];

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const handleUpdateClick = (tracking: Tracking) => {
    console.log('Actualizar tracking:', tracking);
  };

  const handleDeleteClick = () => {
    // pass
  };

  const currentTrackings = trackings.slice(
    currentPage * resultsPerPage,
    (currentPage + 1) * resultsPerPage
  );

  const getContactTypeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'llamada':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800'
        };
      case 'correo':
        return {
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-800'
        };
      case 'reunión presencial':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800'
        };
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <div className="overflow-x-auto overflow-y-auto max-w-full border border-gray-100 rounded-md shadow-xl scrollbar-custom">
        <table className="table-auto bg-white w-full rounded-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm">
              <th className="py-3 px-4 text-center font-semibold w-[120px]">Tipo de Contacto</th>
              <th className="py-3 px-4 text-center font-semibold w-[120px]">Fecha de Contacto</th>
              <th className="py-3 px-4 text-center font-semibold w-[120px]">Contacto Cliente</th>
              <th className="py-3 px-4 text-center font-semibold w-[120px]">Ejecutivo Comercial</th>
              <th className="py-3 px-4 text-center font-semibold w-[300px]">Descripción</th>
              <th className="py-3 px-4 text-center font-semibold w-[250px]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentTrackings.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 px-2 text-center text-gray-500">
                  No hay actividades de seguimiento registradas
                </td>
              </tr>
            ) : (
              currentTrackings.map((tracking, index) => (
                <tr 
                  key={tracking.id}
                  className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-sm text-gray-700`}
                >
                  <td className="py-4 px-2 text-center w-[120px]">
                    {(() => {
                      const styles = getContactTypeStyle(tracking.contactType);
                      return (
                        <span className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium ${styles.textColor} ${styles.bgColor}`}>
                          {tracking.contactType}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="py-4 px-2 text-center w-[120px]">{tracking.contactDate}</td>
                  <td className="py-4 px-2 text-center w-[120px]">{tracking.clientContact}</td>
                  <td className="py-4 px-2 text-center w-[120px]">{tracking.salesExecutive}</td>
                  <td className="py-4 px-2 text-center w-[300px] break-words">{tracking.description}</td>
                  <td className="py-4 px-2 text-center w-[250px]">
                    <div className="flex justify-center gap-1">
                      <button 
                        className="bg-[#FF9800] text-white px-3 py-1 rounded-l-full flex items-center justify-center text-sm hover:bg-[#F57C00] transition-colors duration-200"
                        onClick={() => handleUpdateClick(tracking)}
                      >
                        Actualizar
                      </button>
                      <button 
                        className="bg-red-500 text-white px-3 py-1 rounded-r-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors duration-200"
                        onClick={() => handleDeleteClick()}
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
        pageCount={Math.ceil(trackings.length / resultsPerPage)}
        onPageChange={handlePageChange}
        containerClassName="pagination flex mt-4 space-x-2 overflow-auto justify-center items-center"
        pageClassName="px-3 py-1 rounded-md transition-all duration-200 ease-in-out"
        activeClassName="bg-blue-500 text-white font-semibold border border-blue-600"
        previousClassName="rounded-md px-2 py-1 text-gray-600 hover:text-blue-500 transition duration-200 ease-in-out"
        nextClassName="rounded-md px-2 py-1 text-gray-600 hover:text-blue-500 transition duration-200 ease-in-out"
      />
    </div>
  );
};

export default TrackingTable; 