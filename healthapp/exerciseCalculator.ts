export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
 
interface ExerciseValues {
  target: number;
  dailyHours: number[];
}

export const calculateExercises = (
  dailyHours: number[],
  target: number,
): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = periodLength > 0 ? totalHours / periodLength : 0;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "great job, target achieved";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need to put in more effort";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 2) {
    throw new Error("At least one daily exercise value required");
  }

  const target = Number(args[0]);
  const dailyHoursRaw = args.slice(1);

  if (isNaN(target)) {
    throw new Error("Target value must be a valid number.");
  }

  const dailyHours: number[] = [];

  for (const hour of dailyHoursRaw) {
    if (isNaN(Number(hour))) {
      throw new Error("All daily exercise values must be valid numbers.");
    }
    dailyHours.push(Number(hour));
  }

  return {
    target,
    dailyHours,
  };
};

// Guard: Only execute CLI logic if called directly, not on import
if (process.argv[1] === import.meta.filename) {
  try {
    const { target, dailyHours } = parseExerciseArguments(
      process.argv.slice(2),
    );
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
