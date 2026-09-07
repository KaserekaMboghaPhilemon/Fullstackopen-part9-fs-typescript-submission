import type { ReactElement } from "react";
import type { CoursePart } from "../types.ts";
import Part from "./Part.tsx";

type ContentProps = {
  courseParts: CoursePart[];
};

const Content = ({ courseParts }: ContentProps): ReactElement => (
  <div>
    {courseParts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </div>
);

export default Content;
