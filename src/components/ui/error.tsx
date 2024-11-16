import React from "react";

const ErrorComponent: React.FC = () => (
  <div className="flex flex-col items-center justify-center p-6 bg-[#eceff1]  border border-y-5	 text-[#566573] ">
    <svg
      className="w-12 h-12 text-[#566573] mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4m0 4h.01M12 2a10 10 0 11-7.03 16.97A10 10 0 0112 2z"
      ></path>
    </svg>
    <h2 className="text-lg font-semibold">Error al cargar</h2>
    <p className="mt-2 text-center"></p>
  </div>
);

export default ErrorComponent;
