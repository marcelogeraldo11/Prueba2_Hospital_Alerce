import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientLayout from "./layout/PatientLayout";
import Home from "./pages/Home";
import AddPatient from "./pages/AddPatient";
import ListPatients from "./pages/ListPatients";
import PatientDetail from "./pages/PatientDetail";
import EditPatient from "./pages/EditPatient";
import SearchPatients from "./pages/SearchPatients";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/paciente/" element={<PatientLayout />}>
          <Route index element={<Home />} />
          <Route path="nuevo" element={<AddPatient />} />
          <Route path="listar" element={<ListPatients />} />
          <Route path="detalle/:id" element={<PatientDetail />} />
          <Route path="actualizar/:id" element={<EditPatient />} />
          <Route path="buscar" element={<SearchPatients />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
