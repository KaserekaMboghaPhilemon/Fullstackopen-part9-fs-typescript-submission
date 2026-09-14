import { Gender, HealthCheckRating, type EntryWithoutId } from "./types.ts";

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

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] | undefined => {
  if (diagnosisCodes === undefined) {
    return undefined;
  }

  if (
    !Array.isArray(diagnosisCodes) ||
    diagnosisCodes.some((code) => !isString(code) || code.trim().length === 0)
  ) {
    throw new Error("Diagnosis codes must be an array of non-empty strings");
  }

  return diagnosisCodes;
};

const parseEntryDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing entry date");
  }

  return date;
};

const parseRequiredEntryString = (value: unknown, field: string): string => {
  if (!isString(value) || value.trim().length === 0) {
    throw new Error(`Incorrect or missing ${field}`);
  }

  return value;
};

const parseDischarge = (
  discharge: unknown,
): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing discharge");
  }

  const value = discharge as Record<string, unknown>;
  return {
    date: parseEntryDate(value.date),
    criteria: parseRequiredEntryString(value.criteria, "discharge criteria"),
  };
};

const parseSickLeave = (
  sickLeave: unknown,
): { startDate: string; endDate: string } | undefined => {
  if (sickLeave === undefined) {
    return undefined;
  }

  if (!sickLeave || typeof sickLeave !== "object") {
    throw new Error("Incorrect sickLeave");
  }

  const value = sickLeave as Record<string, unknown>;
  return {
    startDate: parseEntryDate(value.startDate),
    endDate: parseEntryDate(value.endDate),
  };
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (
    rating !== HealthCheckRating.Healthy &&
    rating !== HealthCheckRating.LowRisk &&
    rating !== HealthCheckRating.HighRisk &&
    rating !== HealthCheckRating.CriticalRisk
  ) {
    throw new Error("Incorrect or missing healthCheckRating");
  }

  return rating;
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

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Entry data is missing");
  }

  const entry = object as Record<string, unknown>;
  const baseEntry = {
    description: parseRequiredEntryString(entry.description, "description"),
    date: parseEntryDate(entry.date),
    specialist: parseRequiredEntryString(entry.specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
  };

  switch (entry.type) {
    case "HealthCheck":
      return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
    case "Hospital":
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: parseDischarge(entry.discharge),
      };
    case "OccupationalHealthcare":
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseRequiredEntryString(
          entry.employerName,
          "employerName",
        ),
        sickLeave: parseSickLeave(entry.sickLeave),
      };
    default:
      throw new Error("Incorrect or missing entry type");
  }
};
