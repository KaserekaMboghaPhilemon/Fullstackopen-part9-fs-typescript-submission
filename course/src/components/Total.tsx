import type { ReactElement } from "react";

type TotalProps = {
  totalExercises: number;
};

const Total = ({ totalExercises }: TotalProps): ReactElement => (
  <p>Number of exercises {totalExercises}</p>
);

export default Total;
