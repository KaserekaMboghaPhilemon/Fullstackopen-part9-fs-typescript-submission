import { Router } from "express";
import patientService from "../services/patientService.ts";
import type { NonSensitivePatient } from "../types.ts";
import { toNewPatient } from "../utils.ts";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  const patients: NonSensitivePatient[] =
    patientService.getNonSensitiveEntries();
  res.json(patients);
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient); // Express sends 200 OK by default
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
