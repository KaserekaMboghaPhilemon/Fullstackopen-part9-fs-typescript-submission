import { SyntheticEvent, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  onCancel: () => void;
  onSubmit: (entry: EntryWithoutId) => void;
}

type EntryType = EntryWithoutId["type"];

const AddEntryForm = ({ diagnoses, onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntry = { description, date, specialist, diagnosisCodes };

    if (type === "HealthCheck") {
      onSubmit({ ...baseEntry, type, healthCheckRating });
    } else if (type === "Hospital") {
      onSubmit({
        ...baseEntry,
        type,
        discharge: { date: dischargeDate, criteria: dischargeCriteria },
      });
    } else {
      onSubmit({
        ...baseEntry,
        type,
        employerName,
        sickLeave:
          sickLeaveStartDate || sickLeaveEndDate
            ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
            : undefined,
      });
    }
  };

  const changeType = (event: SelectChangeEvent) => {
    setType(event.target.value as EntryType);
  };

  const changeDiagnosisCodes = (event: SelectChangeEvent<string[]>) => {
    setDiagnosisCodes(event.target.value as string[]);
  };

  return (
    <form onSubmit={submit}>
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="entry-type-label">Type</InputLabel>
        <Select
          labelId="entry-type-label"
          label="Type"
          value={type}
          onChange={changeType}
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            OccupationalHealthcare
          </MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Description"
        fullWidth
        required
        margin="normal"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        label="Date"
        type="date"
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />
      <TextField
        label="Specialist"
        fullWidth
        required
        margin="normal"
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
        <Select
          labelId="diagnosis-codes-label"
          multiple
          label="Diagnosis codes"
          value={diagnosisCodes}
          onChange={changeDiagnosisCodes}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {type === "HealthCheck" && (
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel id="health-check-rating-label">
            Health check rating
          </InputLabel>
          <Select
            labelId="health-check-rating-label"
            label="Health check rating"
            value={String(healthCheckRating)}
            onChange={(event) =>
              setHealthCheckRating(
                Number(event.target.value) as HealthCheckRating,
              )
            }
          >
            {[0, 1, 2, 3].map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {type === "Hospital" && (
        <>
          <TextField
            label="Discharge date"
            type="date"
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <TextField
            label="Discharge criteria"
            fullWidth
            required
            margin="normal"
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </>
      )}
      {type === "OccupationalHealthcare" && (
        <>
          <TextField
            label="Employer name"
            fullWidth
            required
            margin="normal"
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <TextField
            label="Sick leave start date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={sickLeaveStartDate}
            onChange={({ target }) => setSickLeaveStartDate(target.value)}
          />
          <TextField
            label="Sick leave end date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={sickLeaveEndDate}
            onChange={({ target }) => setSickLeaveEndDate(target.value)}
          />
        </>
      )}
      <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
        <Button
          color="secondary"
          variant="contained"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Add entry
        </Button>
      </Grid>
    </form>
  );
};

export default AddEntryForm;
