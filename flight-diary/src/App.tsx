import { useEffect, useState, type ReactElement } from "react";
import { getAllDiaries } from "./services/diaryService.ts";
import type { DiaryEntry } from "./types.ts";

const App = (): ReactElement => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((entries) => setDiaries(entries));
  }, []);

  return (
    <div>
      <h1>Flight Diaries</h1>
      {diaries.map((diary) => (
        <article key={diary.id}>
          <h2>{diary.date}</h2>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
        </article>
      ))}
    </div>
  );
};

export default App;
