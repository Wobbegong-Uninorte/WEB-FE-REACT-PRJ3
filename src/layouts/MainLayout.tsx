// src/layout/MainLayout.tsx
import React from 'react';
import Home from '../pages/Home';


type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = () => {
  return (
    <div >
      Prueba MainLayout
      <Home />
    </div>
  );
};

export default MainLayout;
