interface BmiValues {
  height: number;
  weight: number;
}


export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0) {
    throw new Error("Height must be a positive number.");
  }

  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal range";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obesity";
  }
};

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 2) {
    throw new Error("Two arguments required: height (cm) and weight (kg)");
  }
  if (args.length > 2) {
    throw new Error("Too many arguments provided.");
  }

  const height = Number(args[0]);
  const weight = Number(args[1]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    height,
    weight,
  };
};

// Execution guard: Runs CLI execution only when executed directly
if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseBmiArguments(process.argv.slice(2));
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
