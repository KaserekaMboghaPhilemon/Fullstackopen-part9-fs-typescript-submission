import type { ReactElement } from "react";
import type { CoursePart } from "../types.ts";

type PartProps = {
  part: CoursePart;
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled course part: ${JSON.stringify(value)}`);
};

const Part = ({ part }: PartProps): ReactElement => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <p>
            <strong>{part.name}</strong> {part.exerciseCount}
          </p>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <strong>{part.name}</strong> {part.exerciseCount}
          </p>
          <p>Group project count: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            <strong>{part.name}</strong> {part.exerciseCount}
          </p>
          <p>{part.description}</p>
          <p>Background material: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <strong>{part.name}</strong> {part.exerciseCount}
          </p>
          <p>{part.description}</p>
          <p>Required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
