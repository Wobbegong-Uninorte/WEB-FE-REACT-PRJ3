import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, Building, Phone, Mail, MapPin, Globe} from 'lucide-react';

interface Client {
  id: string;
  nit: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  active: boolean;
}

const ClientDetailTop = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const savedClient = localStorage.getItem('selectedClient');
    if (savedClient) {
      setClient(JSON.parse(savedClient));
    }
  }, []);

  if (!client) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No se encontró información del cliente</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a la lista
      </button>

      <Card className="w-full">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">Información del Cliente</CardTitle>
            <span className={`px-3 py-1 rounded-full text-sm ${
              client.active 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {client.active ? 'ACTIVO' : 'INACTIVO'}
            </span>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <div className="flex items-start space-x-3">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Nombre</p>
              <p className="font-medium">{client.name}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Building className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">NIT</p>
              <p className="font-medium">{client.nit}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="font-medium">{client.phone}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Correo</p>
              <p className="font-medium">{client.email}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Dirección</p>
              <p className="font-medium">{client.address}</p>
              <p className="text-sm text-gray-500 mt-1">{client.city}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Globe className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">País</p>
              <p className="font-medium">{client.country}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetailTop;