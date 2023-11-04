import express from "express";
import cors from "cors";
import conectDB from "./config/db.js";
import pacientesRouter from "./routes/pacienteRoutes.js";
const app = express();
app.use(express.json());
conectDB();

const allowedDomains = ["http://localhost:5173"];

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "DELETE", "PUT"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use("/api/pacientes", cors(), pacientesRouter);
app.options("*", cors());
app.listen(4000, () => {
  console.log("servidor en 4000");
});
