import express, { type Request, type Response } from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses.ts";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req: Request, res: Response) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
