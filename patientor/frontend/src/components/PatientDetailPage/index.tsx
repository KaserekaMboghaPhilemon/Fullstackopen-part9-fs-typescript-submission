import { useEffect, useState } from "react";
import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import axios from "axios";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { Transgender as TransgenderIcon } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import { Diagnosis, EntryWithoutId, Gender, Patient } from "../../types";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [addEntryOpen, setAddEntryOpen] = useState(false);
  const [entryError, setEntryError] = useState<string>();

  useEffect(() => {
    if (id) {
      patientService.getOne(id).then((patient) => setPatient(patient));
    }
  }, [id]);

  useEffect(() => {
    diagnosisService.getAll().then((diagnoses) => setDiagnoses(diagnoses));
  }, []);

  if (!patient) {
    return <Typography>Loading patient details...</Typography>;
  }

  const GenderIcon =
    patient.gender === Gender.Male
      ? MaleIcon
      : patient.gender === Gender.Female
        ? FemaleIcon
        : TransgenderIcon;

  const submitEntry = async (entry: EntryWithoutId) => {
    if (!id) return;

    try {
      const newEntry = await patientService.createEntry(id, entry);
      setPatient((currentPatient) =>
        currentPatient
          ? {
              ...currentPatient,
              entries: currentPatient.entries.concat(newEntry),
            }
          : currentPatient,
      );
      setAddEntryOpen(false);
      setEntryError(undefined);
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        typeof error.response?.data === "string"
      ) {
        setEntryError(error.response.data);
      } else {
        setEntryError("Unable to add entry");
      }
    }
  };

  return (
    <div>
      <Typography variant="h4">
        {patient.name} <GenderIcon />
      </Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Date of birth: {patient.dateOfBirth}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Typography variant="h5">Entries</Typography>
      {entryError && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          <AlertTitle>Could not add entry</AlertTitle>
          {entryError}
        </Alert>
      )}
      {addEntryOpen ? (
        <AddEntryForm
          diagnoses={diagnoses}
          onCancel={() => {
            setAddEntryOpen(false);
            setEntryError(undefined);
          }}
          onSubmit={submitEntry}
        />
      ) : (
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => setAddEntryOpen(true)}
        >
          Add New Entry
        </Button>
      )}
      {patient.entries.length === 0 ? (
        <Typography>No entries</Typography>
      ) : (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      )}
    </div>
  );
};

export default PatientDetailPage;
