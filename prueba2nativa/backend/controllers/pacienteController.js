import Paciente from "../models/Paciente.js";
import validator from "validator";
const agregarPaciente = async (req, res) => {
  try {
    const { rut, nombre, edad, sexo, enfermedad } = req.body;
    const edadString = String(edad);
    if (
      !validator.isLength(rut, { min: 1 }) ||
      !validator.isLength(nombre, { min: 1 }) ||
      !validator.isLength(edadString, { min: 1 }) ||
      !validator.isLength(sexo, { min: 1 }) ||
      !validator.isLength(enfermedad, { min: 1 })
    ) {
      return res
        .status(400)
        .json({ error: "Campos vacíos o datos no válidos" });
    } else {
      const paciente = new Paciente(req.body);
      const pacienteGuardado = await paciente.save();
      return res.status(200).json(pacienteGuardado);
    }
  } catch (e) {
    console.log(e);
  }
};

const obtenerPacientes = async (req, res) => {
  try {
    const sexo = req.query.sexo;
    const enfermedad = req.query.enfermedad;

    const fechaIngreso = req.query.fechaIngreso;
    const fechaInicio = new Date(fechaIngreso);
    const fechaFinal = new Date(fechaInicio);
    fechaFinal.setDate(fechaFinal.getDate() + 1);
    let pacientes;
    if (sexo && enfermedad) {
      pacientes = await Paciente.find({ sexo: sexo, enfermedad: enfermedad });
    } else if (fechaIngreso) {
      pacientes = await Paciente.find({
        fechaIngreso: { $gte: fechaInicio, $lte: fechaFinal },
      });
    } else if (enfermedad) {
      pacientes = await Paciente.find({ enfermedad: enfermedad });
    } else if (sexo) {
      pacientes = await Paciente.find({ sexo: sexo });
    } else {
      pacientes = await Paciente.find();
    }
    return res.status(200).json(pacientes);
    console.log(pacientes);
  } catch (e) {
    console.log(e);
  }
};

const obtenerPaciente = async (req, res) => {
  const { rut } = req.params;
  try {
    const paciente = await Paciente.findOne({ rut: rut });
    if (paciente) {
      return res.status(200).json(paciente);
    } else {
      console.log("a");
      const e = new Error("paciente no encontrado");
      return res.status(400).json({ error: e.message });
    }
  } catch (e) {
    console.log(e);
  }
};

const actualizarPaciente = async (req, res) => {
  try {
    const { rut } = req.params;
    const paciente = await Paciente.findOne({ rut: rut }).exec();
    if (paciente) {
      paciente.nombre = req.body.nombre || paciente.nombre;
      paciente.edad = req.body.edad || paciente.edad;
      paciente.sexo = req.body.sexo || paciente.sexo;
      paciente.fotoPersonal = req.body.fotoPersonal || paciente.fotoPersonal;
      paciente.enfermedad = req.body.enfermedad || paciente.enfermedad;
      paciente.revisado = req.body.revisado || paciente.revisado;
      paciente.fechaIngreso = req.body.fechaIngreso || paciente.fechaIngreso;
      await paciente.save();
      res.json(paciente);
    } else {
      const e = new Error("user not found");
      return res.status(400).json({ error: e.message });
    }
  } catch (e) {
    console.log(e);
  }
};
const eliminarPaciente = async (req, res) => {
  const { rut } = req.params;
  try {
    const paciente = await Paciente.findOneAndDelete({ rut: rut });
    if (paciente) {
      return res.json({ msg: "el paciente fue eliminado." });
    } else {
      const e = new Error("paciente no encontrado");
      return res.status(400).json({ error: e.message });
    }
  } catch (e) {
    console.log(e);
  }
};
export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
