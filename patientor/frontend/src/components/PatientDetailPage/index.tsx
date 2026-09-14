import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Transgender as TransgenderIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Gender, Patient } from "../../types";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (id) {
      patientService.getOne(id).then((patient) => setPatient(patient));
    }
  }, [id]);

  if (!patient) {
    return <Typography>Loading patient details...</Typography>;
  }

  const GenderIcon =
    patient.gender === Gender.Male
      ? MaleIcon
      : patient.gender === Gender.Female
        ? FemaleIcon
        : TransgenderIcon;

  return (
    <div>
      <Typography variant="h4">
        {patient.name} <GenderIcon />
      </Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Date of birth: {patient.dateOfBirth}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Typography variant="h5">Entries</Typography>
      {patient.entries.length === 0 ? (
        <Typography>No entries</Typography>
      ) : (
        patient.entries.map((entry) => (
          <div key={entry.id}>
            <Typography>{entry.date}</Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Specialist: {entry.specialist}</Typography>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientDetailPage;
