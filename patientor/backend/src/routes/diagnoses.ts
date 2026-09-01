import { Router } from "express";
import diagnosisService from "../services/diagnosisService.ts";
import type { Diagnosis } from "../types.ts";

const diagnosesRouter = Router();

diagnosesRouter.get("/", (_req, res) => {
  const diagnoses: Diagnosis[] = diagnosisService.getEntries();
  res.json(diagnoses);
});

export default diagnosesRouter;
