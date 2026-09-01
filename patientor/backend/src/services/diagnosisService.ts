import diagnoses from "../../data/diagnoses.ts";
import type { Diagnosis } from "../types.ts";

const getEntries = (): Diagnosis[] => diagnoses;

export default {
  getEntries,
};
