import express from "express";
import cors from "cors";
import {
  obtenerPacientes,
  agregarPaciente,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/pacienteController.js";

const pacientesRouter = express.Router();

pacientesRouter.route("/").post(agregarPaciente).get(obtenerPacientes);
pacientesRouter
  .route("/:rut")
  .get(obtenerPaciente)
  .put(actualizarPaciente)
  .delete(eliminarPaciente);

export default pacientesRouter;
