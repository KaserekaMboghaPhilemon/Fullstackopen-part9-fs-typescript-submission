const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25.0) return "Normal range";
  if (bmi < 30.0) return "Overweight";
  return "Obesity";
};

const parseBmiArguments = (
  args: string[],
): { height: number; weight: number } => {
  if (args.length !== 2)
    throw new Error("Two arguments required: height and weight");

  const [heightStr, weightStr] = args;
  const height = Number(heightStr);
  const weight = Number(weightStr);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  return { height, weight };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseBmiArguments(process.argv.slice(2));
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    console.log(errorMessage);
  }
}

export { calculateBmi };
