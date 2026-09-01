import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients.ts";
import type { NewPatient, NonSensitivePatient, Patient } from "../types.ts";

const getNonSensitiveEntries = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitiveEntries,
  addPatient,
};
