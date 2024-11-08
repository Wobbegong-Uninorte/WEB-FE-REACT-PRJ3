import React, { useState } from 'react';
import { UserCircle, Users, LineChart, Target, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 font-sans antialiased">
<header className="bg-gradient-to-r from-[#6366f1] to-blue-700 shadow-xl sticky top-0 z-50">
  <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between relative">
    {/* Contenedor del menú y la imagen */}
    <div className="flex items-center space-x-4">
      {/* Botón de menú de hamburguesa para pantallas pequeñas */}
      <button 
        onClick={toggleMenu}
        className="text-white hover:text-gray-200 focus:outline-none lg:hidden" 
        aria-label="Open navigation menu"
      >
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Imagen para pantallas grandes */}
      <div className="hidden lg:block">
        <img 
          src="./crm.png" 
          alt="Imagen de ejemplo" 
          className="h-12 w-12 rounded-full" 
        />
      </div>
    </div>
    
    {/* Botón "CRM Pro" completamente centrado */}
    <div className="absolute inset-0 flex items-center justify-center">
      <button 
        onClick={() => navigate('/')} 
        className="text-lg md:text-2xl font-bold text-white tracking-wider transition-transform hover:scale-105 duration-300"
      >
        CRM Pro
      </button>
    </div>
    
    {/* Perfil de usuario alineado a la derecha */}
    <div className="flex items-center space-x-4 text-white ml-auto">
      <div className="hidden sm:flex flex-col items-end text-sm font-semibold">
        <span className="hover:opacity-90">
          John Doe
        </span>
        <span className="text-gray-300 text-xs hover:text-white">
          JohnDoe@gmail.com
        </span>
      </div>
      
      <div className="relative group">
        <UserCircle 
          className="h-8 w-8 sm:h-10 sm:w-10 text-gray-200 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110 group-hover:shadow-lg" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
      </div>
    </div>
  </div>
</header>


            <div className="flex flex-1">
                {/* Menú de hamburguesa desplegable en modo responsive */}
                {isMenuOpen && (
                    <nav className="lg:hidden bg-blue-700 p-4 absolute top-16 left-0 right-0 z-40 shadow-lg rounded-b-lg">
                        <ul className="space-y-2">
                            <li>
                                <button 
                                    onClick={() => navigate('/clients')}
                                    className="block w-full text-left text-white hover:bg-blue-800 p-2 rounded"
                                >
                                    Clientes
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => navigate('/opportunities')}
                                    className="block w-full text-left text-white hover:bg-blue-800 p-2 rounded"
                                >
                                    Oportunidades
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => navigate('/tracking')}
                                    className="block w-full text-left text-white hover:bg-blue-800 p-2 rounded"
                                >
                                    Seguimiento
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => navigate('/dashboard')}
                                    className="block w-full text-left text-white hover:bg-blue-800 p-2 rounded"
                                >
                                    Dashboard
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}

                <aside className="w-64 bg-white shadow-lg h-screen p-6 hidden lg:block transition-all duration-300 transform">
                    <nav aria-label="Sidebar" className="space-y-4">
                        <ul className="space-y-2">
                            {[
                                { path: '/clients', icon: <Users className="h-6 w-6" />, label: 'Clientes' },
                                { path: '/opportunities', icon: <Target className="h-6 w-6" />, label: 'Oportunidades' },
                                { path: '/tracking', icon: <LineChart className="h-6 w-6" />, label: 'Seguimiento' },
                                { path: '/dashboard', icon: <LayoutDashboard className="h-6 w-6" />, label: 'Dashboard' },
                            ].map((item) => (
                                <li key={item.path}>
                                    <button 
                                        onClick={() => navigate(item.path)} 
                                        className="flex items-center space-x-4 text-gray-700 hover:text-blue-600 hover:bg-blue-100 rounded-lg p-3 transition-all duration-300 transform hover:scale-x-105 focus:ring-2 focus:ring-blue-500">
                                        {item.icon}
                                        <span className="font-medium text-lg">{item.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Sección de actualización en el menú lateral */}
                    <div className="pt-6 mt-6 border-t border-white/30">
                        <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg p-6 transform transition-all duration-500 hover:scale-105">
                            <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-400/60 rounded-full animate-pulse"></div>
                            <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-600/40 rounded-full animate-pulse"></div>

                            <div className="relative text-center">
                                <div className="mb-4 flex items-center justify-center transform transition-all duration-300 hover:scale-110">
                                    <img src="./feature.png" alt="Rocket" className="h-14 w-14" />
                                </div>
                                <p className="text-lg font-semibold text-white">¡Nueva actualización disponible!</p>
                                <p className="text-sm text-white/80 mb-4">Haz clic para actualizar</p>
                                <button 
                                    className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-yellow-600 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 shadow-md">
                                    ¡Actualizar!
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 p-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl shadow-inner">
                    {children}
                </main>
            </div>

            <footer className="bg-gray-900 text-white py-6 text-center shadow-inner mt-8">
                <div className="container mx-auto px-4">
                    <p>&copy; {new Date().getFullYear()} <strong>CRM Pro</strong>. Todos los derechos reservados.</p>
                    <p className="text-sm mt-2">Desarrollado con dedicación para la gestión eficiente de clientes.</p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
