import type { ReactElement } from "react";
import Header from "./components/Header.tsx";
import Content from "./components/Content.tsx";
import Total from "./components/Total.tsx";
import type { CoursePart } from "./types.ts";

const courseName = "Half Stack application development";

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the easy part",
    kind: "basic",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial:
      "https://type-level-typescript.com/template-literal-types",
    kind: "background",
  },
  {
    name: "TypeScript in the frontend",
    exerciseCount: 10,
    description: "A type-safe frontend",
    requirements: ["node", "jest"],
    kind: "special",
  },
];

const App = (): ReactElement => {
  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
