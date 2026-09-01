import { Router } from "express";
import patientService from "../services/patientService.ts";
import type { NonSensitivePatient } from "../types.ts";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  const patients: NonSensitivePatient[] =
    patientService.getNonSensitiveEntries();
  res.json(patients);
});

export default patientsRouter;
