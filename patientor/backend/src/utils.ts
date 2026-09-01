import { Gender } from "./types.ts";

export const isString = (text: unknown): text is string =>
  typeof text === "string";

export const isDate = (date: string): date is string =>
  !Number.isNaN(Date.parse(date));

export const isGender = (gender: string): gender is Gender =>
  Object.values(Gender).includes(gender as Gender);

const parseName = (name: unknown): string => {
  if (!isString(name) || name.trim().length === 0) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing dateOfBirth");
  }

  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || ssn.trim().length === 0) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || occupation.trim().length === 0) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

export const toNewPatient = (object: unknown) => {
  if (!object || typeof object !== "object") {
    throw new Error("Patient data is missing");
  }

  const patient = object as Record<string, unknown>;

  return {
    name: parseName(patient.name),
    dateOfBirth: parseDateOfBirth(patient.dateOfBirth),
    ssn: parseSsn(patient.ssn),
    gender: parseGender(patient.gender),
    occupation: parseOccupation(patient.occupation),
  };
};
