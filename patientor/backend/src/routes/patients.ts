import { Router } from "express";
import patientService from "../services/patientService.ts";
import type { NonSensitivePatient } from "../types.ts";
import { toNewEntry, toNewPatient } from "../utils.ts";

const patientsRouter = Router();

patientsRouter.get("/", (_req, res) => {
  const patients: NonSensitivePatient[] =
    patientService.getNonSensitiveEntries();
  res.json(patients);
});

patientsRouter.get("/:id", (req, res) => {
  const patient = patientService.getPatient(req.params.id);

  if (!patient) {
    res.status(404).send("Patient not found");
    return;
  }

  res.json(patient);
});

patientsRouter.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);

    if (!addedEntry) {
      res.status(404).send("Patient not found");
      return;
    }

    res.status(200).json(addedEntry);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong.";
    res.status(400).send(errorMessage);
  }
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong.";
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;
