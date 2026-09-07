import axios from "axios";
import { useEffect, useState, type FormEvent, type ReactElement } from "react";
import { createDiary, getAllDiaries } from "./services/diaryService.ts";
import { Visibility, Weather, type DiaryEntry } from "./types.ts";

const App = (): ReactElement => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAllDiaries()
      .then((data) => {
        setDiaries(data);
      })
      .catch((error) => {
        console.error("Failed to fetch diary entries:", error);
        setError("Failed to fetch diary entries");
      });
  }, []);

  const submitDiary = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const newDiary = await createDiary({
        date,
        visibility,
        weather,
        comment,
      });
      setDiaries((currentDiaries) => currentDiaries.concat(newDiary));
      setDate("");
      setVisibility(Visibility.Great);
      setWeather(Weather.Sunny);
      setComment("");
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        const responseData = requestError.response?.data;
        setError(
          typeof responseData === "string"
            ? responseData
            : (responseData?.error ?? requestError.message),
        );
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submitDiary}>
        <div>
          date{" "}
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility&nbsp;
          {Object.values(Visibility).map((value) => (
            <label key={value} style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="visibility"
                value={value}
                checked={visibility === value}
                onChange={() => setVisibility(value)}
              />
              &nbsp;{value}
            </label>
          ))}
        </div>
        <div>
          weather&nbsp;
          {Object.values(Weather).map((value) => (
            <label key={value} style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="weather"
                value={value}
                checked={weather === value}
                onChange={() => setWeather(value)}
              />
              &nbsp;{value}
            </label>
          ))}
        </div>
        <div>
          comment{" "}
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
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
