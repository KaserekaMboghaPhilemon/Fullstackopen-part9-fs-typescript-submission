import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients.ts";
import type {
  Entry,
  EntryWithoutId,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types.ts";

const getNonSensitiveEntries = (): NonSensitivePatient[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const getPatient = (id: string): Patient | undefined =>
  patients.find((patient) => patient.id === id);

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...entry,
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (
  patientId: string,
  entry: EntryWithoutId,
): Entry | undefined => {
  const patient = getPatient(patientId);

  if (!patient) {
    return undefined;
  }

  const newEntry: Entry = {
    id: uuidv4(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitiveEntries,
  getPatient,
  addPatient,
  addEntry,
};
