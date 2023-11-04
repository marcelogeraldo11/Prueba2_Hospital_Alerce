import React from "react";
import Title from "../components/Title";
import { useState, useEffect } from "react";
import axiosClient from "../config/axios";
import { Link } from "react-router-dom";

const ListPatients = () => {
  const [patients, setPatients] = useState([]);

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

  const handleDeletePatient = async (rut) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axiosClient.delete(`/pacientes/${rut}`, config);

      // Actualiza la lista de pacientes en el estado, excluyendo el paciente eliminado
      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.rut !== rut)
      );
    } catch (error) {
      console.error("Error al eliminar el paciente", error);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <Title blue="Listado de " black=" Pacientes" />
        <table className="min-w-full mt-10 mb-10 bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Fotografia</th>
              <th className="py-2 px-4">Nombre</th>
              <th className="py-2 px-4">detalle</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.rut} className="border-b hover:bg-gray-200">
                <td className="py-2 px-4">{patient.fotoPersonal}</td>
                <td className="py-2 px-4">{patient.nombre}</td>
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

export default ListPatients;
