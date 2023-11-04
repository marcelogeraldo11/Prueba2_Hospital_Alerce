import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
const PatientLayout = () => {
  return (
    <>
      <header className="py-10 bg-red-500">
        <div className=" ml-2 container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <h1 className=" font-bold text-2xl text-red-100 text-center">
            Hospital el <span className=" text-white font-black"> Alerce</span>
          </h1>
          <nav className="flex flex-col items-center md:flex-row gap-4 mt-5 md:mt-0 md:mx-5">
            <Link
              to="/paciente/listar"
              className="text-white text-sm uppercase font-bold"
            >
              Ver Pacientes
            </Link>
            <Link
              to="/Paciente/nuevo"
              className="text-white text-sm uppercase font-bold"
            >
              Agregar Paciente
            </Link>
            <Link
              to="/Paciente/buscar"
              className="text-white text-sm uppercase font-bold"
            >
              Buscar Pacientes
            </Link>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default PatientLayout;
