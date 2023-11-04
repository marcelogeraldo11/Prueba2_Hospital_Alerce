import React from "react";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";

const EditPatient = () => {
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [fotoPersonal, setFotoPersonal] = useState("");
  const [enfermedad, setEnfermedad] = useState("");
  const [revisado, setRevisado] = useState("");

  const [patient, setPatient] = useState();

  const [alert, setAlert] = useState("");

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
        const patientData = data.data;
        setRut(patientData.rut);
        setNombre(patientData.nombre);
        setEdad(patientData.edad);
        setSexo(patientData.sexo);
        setFotoPersonal(patientData.fotoPersonal);
        setEnfermedad(patientData.enfermedad);
        setRevisado(patientData.revisado);
      } catch (e) {
        console.log(e);
      }
    };
    getPatient();
  }, []);

  const handleSubmit = async (e) => {
    console.log(revisado);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    e.preventDefault();
    if ([rut, nombre, edad, sexo, fotoPersonal, enfermedad].includes("")) {
      setAlert({ msg: "Hay campos vacios", error: true });
      console.log(alert.msg);
      return;
    }
    setAlert({});
    try {
      const response = await axiosClient.put(`/pacientes/${rut}`, {
        rut,
        nombre,
        edad,
        sexo,
        fotoPersonal,
        enfermedad,
        revisado,
      });
      setAlert({
        msg: "Paciente editado correctamente",
        error: false,
      });
    } catch (e) {
      setAlert({
        msg: e.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      {patient ? (
        <>
          <Title blue="Registra a un Nuevo " black=" Paciente" />
          <div className="mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alert alert={alert} />}
            <form onSubmit={handleSubmit}>
              <Input
                label="Rut"
                type="text"
                placeholder="Rut Paciente"
                value={rut}
                handleChange={(e) => setRut(e.target.value)}
              />
              <Input
                label="Nombre"
                type="text"
                placeholder="Nombre Paciente"
                value={nombre}
                handleChange={(e) => setNombre(e.target.value)}
              />
              <Input
                label="edad"
                type="text"
                placeholder="Edad Paciente"
                value={edad}
                handleChange={(e) => setEdad(e.target.value)}
              />
              <Input
                label="sexo"
                type="text"
                placeholder="Sexo Paciente"
                value={sexo}
                handleChange={(e) => setSexo(e.target.value)}
              />
              <Input
                label="foto"
                type="text"
                placeholder="Foto Paciente"
                value={fotoPersonal}
                handleChange={(e) => setFotoPersonal(e.target.value)}
              />
              <Input
                label="enfermedad"
                type="text"
                placeholder="Enfermedad Paciente"
                value={enfermedad}
                handleChange={(e) => setEnfermedad(e.target.value)}
              />
              <div className="my-5">
                <label
                  htmlFor="revisado"
                  className=" uppercase text-gray-600 block text-xl font-bold"
                >
                  Revisado
                </label>
                <input
                  type="checkbox"
                  id="revisado"
                  name="revisado"
                  checked={revisado}
                  className="mt-3 h-6 w-6"
                  onChange={(e) => setRevisado(e.target.checked)}
                />
              </div>
              <SubmitButton value="Actualizar" />
            </form>
          </div>
        </>
      ) : (
        <div className="text-center text-xl font-bold mt-4"></div>
      )}
    </>
  );
};

export default EditPatient;
