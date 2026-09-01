import patients from "../../data/patients.ts";
import type { NonSensitivePatient } from "../types.ts";

const getNonSensitiveEntries = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

export default {
  getNonSensitiveEntries,
};
