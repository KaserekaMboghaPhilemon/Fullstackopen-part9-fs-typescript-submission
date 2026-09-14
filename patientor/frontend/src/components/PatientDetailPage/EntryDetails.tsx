import {
  Favorite,
  MedicalInformation,
  MedicalServices,
  Work,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import {
  Entry,
  HealthCheckRating,
  Diagnosis,
} from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDiagnoses = ({
  diagnosisCodes,
  diagnoses,
}: {
  diagnosisCodes?: string[];
  diagnoses: Diagnosis[];
}) => {
  if (!diagnosisCodes || diagnosisCodes.length === 0) {
    return null;
  }

  return (
    <Box component="ul" sx={{ margin: 0 }}>
      {diagnosisCodes.map((code) => {
        const diagnosis = diagnoses.find((item) => item.code === code);
        return <li key={code}>{diagnosis ? `${code} ${diagnosis.name}` : code}</li>;
      })}
    </Box>
  );
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const commonDetails = (
    <>
      <Typography>Date: {entry.date}</Typography>
      <Typography>Description: {entry.description}</Typography>
      <Typography>Specialist: {entry.specialist}</Typography>
      <EntryDiagnoses diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} />
    </>
  );

  switch (entry.type) {
    case "Hospital":
      return (
        <Box sx={{ border: 1, borderColor: "divider", padding: 2, marginTop: 2 }}>
          <MedicalServices />
          {commonDetails}
          <Typography>Discharge date: {entry.discharge.date}</Typography>
          <Typography>Discharge criteria: {entry.discharge.criteria}</Typography>
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box sx={{ border: 1, borderColor: "divider", padding: 2, marginTop: 2 }}>
          <Work />
          {commonDetails}
          <Typography>Employer: {entry.employerName}</Typography>
          {entry.sickLeave && (
            <Typography>
              Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </Typography>
          )}
        </Box>
      );
    case "HealthCheck": {
      const ratingColors: Record<HealthCheckRating, string> = {
        [HealthCheckRating.Healthy]: "green",
        [HealthCheckRating.LowRisk]: "yellow",
        [HealthCheckRating.HighRisk]: "orange",
        [HealthCheckRating.CriticalRisk]: "red",
      };

      return (
        <Box sx={{ border: 1, borderColor: "divider", padding: 2, marginTop: 2 }}>
          <MedicalInformation />
          {commonDetails}
          <Favorite sx={{ color: ratingColors[entry.healthCheckRating] }} />
        </Box>
      );
    }
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;