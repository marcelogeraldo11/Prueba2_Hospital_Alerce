import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { logOut } = useAuth();
  return (
    <header className="py-10 bg-indigo-600">
      <div className=" ml-2 container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className=" font-bold text-2xl text-indigo-200 text-center">
          Administrador de{" "}
          <span className=" text-white font-black"> Pacientes</span>
        </h1>
        <nav className="flex flex-col items-center md:flex-row gap-4 mt-5 md:mt-0 md:mx-5">
          <Link to="/admin" className="text-white text-sm uppercase font-bold">
            Pacientes
          </Link>
          <Link to="/admin" className="text-white text-sm uppercase font-bold">
            Perfil
          </Link>
          <button
            type="button"
            className="text-white text-sm uppercase font-bold"
            onClick={logOut}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
