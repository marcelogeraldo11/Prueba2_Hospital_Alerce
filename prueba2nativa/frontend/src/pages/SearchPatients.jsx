import React from "react";
import Title from "../components/Title";
import { useState, useEffect } from "react";
import axiosClient from "../config/axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
const SearchPatients = () => {
  const [patients, setPatients] = useState([]);
  const [filterSexo, setFilterSexo] = useState("");
  const [filterFechaIngreso, setFilterFechaIngreso] = useState("");
  const [filterEnfermedad, setFilterEnfermedad] = useState("");

  useEffect(() => {
    const getPatients = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const data = await axiosClient("/pacientes", config);
        setPatients(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getPatients();
  }, []);

  const applyFilters = async () => {
    setPatients([]);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (filterFechaIngreso) {
        console.log(filterFechaIngreso);
      }
      if (filterSexo && filterEnfermedad) {
        const dataFilter = await axiosClient(
          `/pacientes?sexo=${filterSexo}&enfermedad=${filterEnfermedad}`,
          config
        );
        setPatients(dataFilter.data);
      } else if (filterSexo) {
        console.log(filterSexo);
        const dataFilter = await axiosClient(
          `/pacientes?sexo=${filterSexo}`,
          config
        );
        setPatients(dataFilter.data);
      } else if (filterEnfermedad) {
        const dataFilter = await axiosClient(
          `/pacientes?enfermedad=${filterEnfermedad}`,
          config
        );
        setPatients(dataFilter.data);
      } else {
        const data = await axiosClient(`/pacientes`, config);
        setPatients(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container mx-auto w-11/12">
        <Title blue="Filtrar " black=" Por" />
        <div className="flex justify-between mt-10">
          <div>
            <label className=" text-gray-600  text-xl font-bold my-2 mr-2">
              Sexo:
            </label>
            <select
              value={filterSexo}
              onChange={(e) => setFilterSexo(e.target.value)}
              className="mx-1 p-1 text-gray-800  text-xl font-bold rounded-md"
            >
              <option value="">Todos</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
          <div>
            <label className=" text-gray-600  text-xl font-bold my-2 mr-2">
              Fecha de Ingreso:
            </label>
            <input
              type="date"
              value={filterFechaIngreso}
              className="border p-1 mr-2 bg-gray-100 rounded-md"
              onChange={(e) => setFilterFechaIngreso(e.target.value)}
            />
          </div>
          <div>
            <label className=" text-gray-600  text-xl font-bold my-2 mr-2">
              Enfermedad:
            </label>
            <input
              type="text"
              value={filterEnfermedad}
              className="border p-1 mr-2 bg-gray-100 rounded-md"
              onChange={(e) => setFilterEnfermedad(e.target.value)}
            />
          </div>
          <button
            onClick={() => applyFilters()}
            className="bg-red-500 w-full py-2 px-10 rounded-xl text-white uppercase font-bold hover:bg-red-700 hover:cursor-pointer md:w-auto"
          >
            Aplicar Filtros
          </button>
        </div>

        <Title blue="Listado de " black=" Pacientes" />
        <table className="min-w-full mt-10 mb-10 bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Rut</th>
              <th className="py-2 px-4">Nombre</th>
              <th className="py-2 px-4">Edad</th>
              <th className="py-2 px-4">Sexo</th>
              <th className="py-2 px-4">Enfermedad</th>
              <th className="py-2 px-4">Fecha Ingreso</th>
              <th className="py-2 px-4">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.rut} className="border-b hover:bg-gray-200">
                <td className="py-2 px-4">{patient.rut}</td>
                <td className="py-2 px-4">{patient.nombre}</td>
                <td className="py-2 px-4">{patient.edad}</td>
                <td className="py-2 px-4">{patient.sexo}</td>
                <td className="py-2 px-4">{patient.enfermedad}</td>
                <td className="py-2 px-4">
                  {format(new Date(patient.fechaIngreso), "dd/MM/yyyy")}
                </td>
                <td className="py-2 px-4">
                  <Link
                    to={`/paciente/detalle/${patient.rut}`}
                    className="bg-green-500 rounded-md text-white px-2 py-1 hover:bg-green-600"
                  >
                    Detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SearchPatients;
