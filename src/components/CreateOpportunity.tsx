// src/pages/CreateOpportunity.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import OpportunityForm from "../components/OpportunityForm";
import { createOpportunity } from "../services/opportunityServices";
import { Opportunities } from "../types/opportunities";
import MainLayout from "../layouts/MainLayout";

const CreateOpportunity: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateOpportunity = async (opportunity: Opportunities) => {
    try {
      await createOpportunity(opportunity);
      alert("Oportunidad creada con éxito");
      navigate("/OpportunitiesPage"); // Redirige de vuelta a la página de lista de oportunidades después de crear la oportunidad
    } catch (error) {
      console.log("Error creando oportunidad: ", error);
    }
  };

  return (
    <MainLayout>
      <OpportunityForm onSubmit={handleCreateOpportunity} />
    </MainLayout>
  );
};

export default CreateOpportunity;
