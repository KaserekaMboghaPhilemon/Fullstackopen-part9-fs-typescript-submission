import express, { type Request, type Response } from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/hello", (_req: Request, res: Response) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (
    req.query.height === undefined ||
    req.query.weight === undefined ||
    Number.isNaN(height) ||
    Number.isNaN(weight)
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({
    weight,
    height,
    bmi,
  });
});

app.post("/exercises", (req: Request, res: Response) => {
  const body = req.body as {
    daily_exercises?: unknown;
    target?: unknown;
  };

  if (!body.daily_exercises || body.target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (
    !Array.isArray(body.daily_exercises) ||
    Number.isNaN(Number(body.target))
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const parsedDailyExercises = body.daily_exercises.map((value) =>
    Number(value),
  );

  if (parsedDailyExercises.some((value) => Number.isNaN(value))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(parsedDailyExercises, Number(body.target));

  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
