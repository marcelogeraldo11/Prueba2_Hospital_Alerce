import React from "react";
import { useState, useEffect } from "react";
import axiosClient from "../config/axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const PatientDetail = () => {
  const [patient, setPatient] = useState();

  const { id } = useParams();

  useEffect(() => {
    const getPatient = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const data = await axiosClient(`/pacientes/${id}`, config);
        setPatient(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getPatient();
  }, []);

  const handleDeletePatient = async (rut) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axiosClient.delete(`/pacientes/${rut}`, config);
      window.alert("Paciente Eliminado");
      window.location.href = "http://localhost:5173/paciente/listar";
    } catch (error) {
      console.error("Error al eliminar el paciente", error);
    }
  };

  console.log(patient);

  return (
    <>
      {patient ? (
        <div className="bg-white p-4 w-3/4 mx-auto mt-5 rounded-lg shadow-lg flex flex-col items-start relative">
          <div className="flex items-center">
            <div className="mr-4">
              <img
                src={patient.fotoPersonal}
                alt={patient.fotoPersonal}
                className="w-24 h-24 rounded-full"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Detalles del Paciente</h2>
              <div>
                <strong>Rut:</strong> {patient.rut}
              </div>
              <div>
                <strong>Nombre:</strong> {patient.nombre}
              </div>
              <div>
                <strong>Edad:</strong> {patient.edad}
              </div>
              <div>
                <strong>Género:</strong> {patient.sexo}
              </div>
              <div>
                <strong>Enfermedad:</strong> {patient.enfermedad}
              </div>
              <div>
                <strong>Fecha Ingreso: </strong>
                {format(new Date(patient.fechaIngreso), "dd/MM/yyyy HH:mm:ss")}
              </div>
              <div>
                <strong>Revisado:</strong> {patient.revisado ? "Si" : "No"}
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-5">
            <div className="flex justify-between">
              <Link
                to="/paciente/listar"
                className="bg-gray-700 rounded-md text-white px-4 py-2 hover:bg-gray-800"
              >
                Volver
              </Link>
              <button
                onClick={() => handleDeletePatient(patient.rut)}
                className="bg-red-500 rounded-md text-white px-4 py-2  hover:bg-red-600"
              >
                Eliminar
              </button>
              <Link
                to={`/paciente/actualizar/${patient.rut}`}
                className="bg-yellow-500 rounded-md text-white px-4 py-2  hover:bg-yellow-600"
              >
                Editar
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl font-bold mt-4">
          No se encontraron datos de paciente.
          <Link
            to={`/paciente/listar`}
            className="bg-gray-600 rounded-md text-white px-2 py-1 hover:bg-gray-800"
          >
            Volver
          </Link>
        </div>
      )}
    </>
  );
};

export default PatientDetail;
