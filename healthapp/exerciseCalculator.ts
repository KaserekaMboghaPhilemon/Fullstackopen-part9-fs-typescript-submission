interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const total = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = total / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "excellent";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "bad";
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

const parseExerciseArguments = (
  args: string[],
): { target: number; dailyHours: number[] } => {
  if (args.length === 0) {
    throw new Error("At least target value and one exercise value required");
  }

  const values = args.map(Number);
  if (values.some((val) => isNaN(val))) {
    throw new Error("Provided values were not numbers!");
  }

  const target = values[0];
  const dailyHours = values.slice(1);

  if (dailyHours.length === 0) {
    throw new Error("At least one daily exercise value required");
  }

  return { target, dailyHours };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, dailyHours } = parseExerciseArguments(
      process.argv.slice(2),
    );
    const result = calculateExercises(dailyHours, target);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    console.log(errorMessage);
  }
}

export { calculateExercises, type Result };

// Exercise 9.3 CLI support.
