import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
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
      <Typography>Occupation: {patient.occupation}</Typography>
    </div>
  );
};

export default PatientDetailPage;
