import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PatientListPage from "./components/PatientListPage";
import PatientDetailPage from "./components/PatientDetailPage";
import patientService from "./services/patients";
import { Patient } from "./types";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    patientService.getAll().then((patients) => setPatients(patients));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PatientListPage patients={patients} setPatients={setPatients} />
          }
        />
        <Route path="/patients/:id" element={<PatientDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
