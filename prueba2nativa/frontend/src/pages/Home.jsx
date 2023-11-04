import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  console.log("asdsa");
  return (
    <>
      <div class="mt-10 flex justify-center items-center ">
        <div class="grid grid-cols-1 gap-4">
          <Link
            to="/paciente/listar"
            class="bg-red-500 text-white p-4 rounded hover:bg-red-600"
          >
            Ver Pacientes
          </Link>
          <Link
            to="/paciente/buscar"
            class="bg-red-500 text-white p-4 rounded hover:bg-red-600"
          >
            Buscar Pacientes
          </Link>
          <Link
            to="/paciente/nuevo"
            class="bg-red-500 text-white p-4 rounded hover:bg-red-600"
          >
            Agregar Paciente
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
