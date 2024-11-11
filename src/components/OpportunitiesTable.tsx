import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import DeleteOpportunityDialog from './DeleteOpportunityDialog';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface Opportunity {
  id: string;
  businessName: string;
  businessLine: string;
  description: string;
  estimatedValue: number;
  estimatedDate: string;
  status: string;
}

const OpportunitiesTable = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const resultsPerPage = 8;

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await fetch('https://web-fe-react-prj3-api.onrender.com/opportunities');
      if (!response.ok) {
        throw new Error(`Error al obtener las oportunidades: ${response.statusText}`);
      }
      const data = await response.json();
      
      setOpportunities(Array.isArray(data) ? data : [data]);
      setError(null);
    } catch (error) {
      console.error('Error al obtener las oportunidades:', error);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOpportunity = async (id: string) => {
    try {
      const response = await fetch(`https://web-fe-react-prj3-api.onrender.com/opportunities/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Error al eliminar la oportunidad: ${response.statusText}`);
      }
  
      // Asegúrate de que la respuesta fue exitosa y filtra la oportunidad correctamente
      setOpportunities(prevOpportunities => {
        const updatedOpportunities = prevOpportunities.filter(opp => opp.id !== id);
        console.log('Oportunidades actualizadas:', updatedOpportunities); // Verifica la lista después de la eliminación
        return updatedOpportunities;
      });
  
      // Ajustar la página si es necesario
      const remainingItems = opportunities.length - 1;
      const maxPages = Math.ceil(remainingItems / resultsPerPage);
      if (currentPage >= maxPages) {
        setCurrentPage(Math.max(0, maxPages - 1));
      }
    } catch (error) {
      console.error('Error al eliminar la oportunidad:', error);
      setError('Error al eliminar la oportunidad');
    }
  };

  const currentOpportunities = opportunities.slice(
    currentPage * resultsPerPage,
    (currentPage + 1) * resultsPerPage
  );

  const handleOpportunityClick = (opportunity: Opportunity) => {
    localStorage.setItem('selectedOpportunity', JSON.stringify(opportunity));
    navigate('/OppDetailsPage');
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case 'GANADA':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800'
        };
      case 'PERDIDA':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800'
        };
      case 'EN PROCESO':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800'
        };
      case 'CANCELADA':
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800'
        };
    }
  };

  if (loading) {
    return <div className="flex justify-center p-4">Cargando...</div>;
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
            <tr className="text-sm border-b border-gray-200 bg-gray-200 text-gray-700">
              <th className="py-3 px-2 text-center font-semibold whitespace-nowrap w-[100px]">Nombre Negocio</th>
              <th className="py-3 px-2 text-center font-semibold whitespace-nowrap w-[90px]">Línea Negocio</th>
              <th className="py-3 px-2 text-center font-semibold w-[200px]">Descripción</th>
              <th className="py-3 px-2 text-center font-semibold whitespace-nowrap w-[90px]">Valor Estimado</th>
              <th className="py-3 px-2 text-center font-semibold whitespace-nowrap w-[80px]">Fecha Estimada</th>
              <th className="py-3 px-2 text-center font-semibold whitespace-nowrap w-[70px]">Estado</th>
              <th className="py-3 px-2 text-center font-semibold whitespace-nowrap w-[180px]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentOpportunities.map((opportunity, index) => (
              <tr 
                key={opportunity.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} border-b border-gray-100 text-sm text-gray-600 hover:bg-gray-50/50 transition-colors duration-150`}
              >
                <td className="py-4 px-2 text-center whitespace-nowrap w-[100px] cursor-pointer hover:text-gray-800" 
                    onClick={() => handleOpportunityClick(opportunity)}>
                  {opportunity.businessName}
                </td>
                <td className="py-4 px-2 text-center whitespace-nowrap w-[90px]">{opportunity.businessLine}</td>
                <td className="py-4 px-2 text-center w-[200px] break-words">{opportunity.description}</td>
                <td className="py-4 px-2 text-center whitespace-nowrap w-[90px]">
                  {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(opportunity.estimatedValue)}
                </td>
                <td className="py-4 px-2 text-center whitespace-nowrap w-[80px]">
                  {new Date(opportunity.estimatedDate).toLocaleDateString('es-CO')}
                </td>
                <td className="py-4 px-2 text-center whitespace-nowrap w-[70px]">
                  {(() => {
                    const styles = getStatusStyle(opportunity.status);
                    return (
                      <span className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium ${styles.textColor} ${styles.bgColor}`}>
                        {opportunity.status}
                      </span>
                    );
                  })()}
                </td>
                <td className="py-4 px-2 text-center w-[180px]">
                  <div className="flex justify-center gap-1">
                    <button 
                      className="bg-[#FF9800] text-white px-3 py-1 rounded-l-full flex items-center justify-center text-sm hover:bg-[#F57C00] transition-colors duration-200"
                      onClick={() => {/* Función para actualizar */}}
                    >
                      Actualizar
                    </button>
                    <DeleteOpportunityDialog
                      opportunityId={opportunity.id}
                      opportunityDescription={opportunity.description}
                      onDelete={handleDeleteOpportunity}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={<FaArrowLeft />}
        nextLabel={<FaArrowRight />}
        pageCount={Math.ceil(opportunities.length / resultsPerPage)}
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

export default OpportunitiesTable;