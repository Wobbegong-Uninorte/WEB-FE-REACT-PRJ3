import React from 'react';
import { UserCircle, Users, LineChart, Target, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 font-sans antialiased">
            <header className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between relative">
                    {/* Menú de hamburguesa alineado a la izquierda */}
                    <div className="flex items-center">
                        <button 
                            className="text-white hover:text-gray-200 focus:outline-none lg:hidden" 
                            aria-label="Open navigation menu"
                        >
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Botón "CRM Pro" completamente centrado */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                            onClick={() => navigate('/')} 
                            className="text-2xl font-bold text-white tracking-wider transition-transform hover:scale-105 duration-300"
                        >
                            CRM Pro
                        </button>
                    </div>
                    
                    {/* Perfil de usuario alineado a la derecha */}
                    <div className="flex items-center space-x-6 text-white ml-auto">
                        <span className="text-sm font-semibold">John Doe</span>
                        <UserCircle className="h-10 w-10 text-gray-200" />
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
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
                                        className="flex items-center space-x-4 text-gray-700 hover:text-blue-600 hover:bg-blue-100 rounded-lg p-3 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-blue-500">
                                        {item.icon}
                                        <span className="font-medium text-lg">{item.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
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
