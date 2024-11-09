// src/components/OpportunityForm.tsx

import React, { useState } from "react";
import { Opportunities } from "../types/opportunities";

type OpportunityFormProps = {
  onSubmit: (opportunity: Opportunities) => void;
};

const OpportunityForm: React.FC<OpportunityFormProps> = ({ onSubmit }) => {
  const [opportunity, setOpportunity] = useState<Opportunities>({
    client: "",
    businessName: "",
    businessLine: "outsourcing recursos",
    description: "",
    estimatedValue: 0,
    estimatedDate: new Date(),
    status: "Apertura",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setOpportunity({ ...opportunity, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(opportunity);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-md space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Crear Oportunidad
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Cliente
          </label>
          <select
            name="client"
            value={opportunity.client}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:border-gray-600"
          >
            <option value="">Seleccionar Cliente</option>
            <option value="Cliente1">Cliente 1</option>
            <option value="Cliente2">Cliente 2</option>
            {/* Agrega opciones dinámicas de clientes si están disponibles */}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Nombre de Negocio
          </label>
          <input
            type="text"
            name="businessName"
            value={opportunity.businessName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:border-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Línea de Negocio
          </label>
          <select
            name="businessLine"
            value={opportunity.businessLine}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:border-gray-600"
          >
            <option value="outsourcing recursos">Outsourcing Recursos</option>
            <option value="desarrollo web">Desarrollo Web</option>
            <option value="desarrollo mobile">Desarrollo Mobile</option>
            <option value="consultoría TI">Consultoría TI</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            name="description"
            value={opportunity.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:border-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Valor Estimado
          </label>
          <input
            type="number"
            name="estimatedValue"
            value={opportunity.estimatedValue}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:border-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Fecha Estimada de Realización
          </label>
          <input
            type="date"
            name="estimatedDate"
            value={opportunity.estimatedDate.toISOString().split("T")[0]}
            onChange={(e) =>
              setOpportunity({
                ...opportunity,
                estimatedDate: new Date(e.target.value),
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        >
          Crear Oportunidad
        </button>
      </form>
    </div>
  );
};

export default OpportunityForm;
