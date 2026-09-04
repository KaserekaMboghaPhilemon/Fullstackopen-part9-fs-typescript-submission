import Header from "./components/Header.tsx";
import Content from "./components/Content.tsx";
import Total from "./components/Total.tsx";

const courseName = "Half Stack application development";

const courseParts = [
  {
    name: "Fundamentals of React",
    exerciseCount: 10,
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
  },
];

const App = () => {
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
