import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import Alert from "../components/Alert";
import axiosClient from "../config/axios";

const AddPatient = () => {
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [fotoPersonal, setFotoPersonal] = useState("");
  const [enfermedad, setEnfermedad] = useState("");

  const [alert, setAlert] = useState("");

  const handleSubmit = async (e) => {
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
      const response = await axiosClient.post("/pacientes", {
        rut,
        nombre,
        edad,
        sexo,
        fotoPersonal,
        enfermedad,
      });
      setAlert({
        msg: "Paciente creado correctamente",
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
          <SubmitButton value="agregar" />
        </form>
      </div>
    </>
  );
};

export default AddPatient;
