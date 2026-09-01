import express, { type Request, type Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

// Global middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/ping", (_req: Request, res: Response) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
