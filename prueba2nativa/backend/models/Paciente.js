import mongoose from "mongoose";

const pacientesSchema = mongoose.Schema(
  {
    rut: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    edad: {
      type: Number,
      required: true,
    },
    sexo: {
      type: String,
      required: true,
    },
    fotoPersonal: {
      type: String,
      required: true,
    },
    fechaIngreso: {
      type: Date,
      default: Date.now,
    },
    enfermedad: {
      type: String,
      required: true,
    },
    revisado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Paciente = mongoose.model("Paciente", pacientesSchema);

export default Paciente;
