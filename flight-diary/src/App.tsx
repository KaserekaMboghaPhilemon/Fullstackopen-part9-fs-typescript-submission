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
    getAllDiaries().then((entries) => setDiaries(entries));
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
      setDiaries(diaries.concat(newDiary));
      setDate("");
      setVisibility(Visibility.Great);
      setWeather(Weather.Sunny);
      setComment("");
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        setError(requestError.response?.data?.error ?? requestError.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <h1>Flight Diaries</h1>
      <h2>Add new entry</h2>
      <form onSubmit={submitDiary}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <fieldset>
          <legend>Visibility</legend>
          {Object.values(Visibility).map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="visibility"
                value={value}
                checked={visibility === value}
                onChange={() => setVisibility(value)}
              />
              {value}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Weather</legend>
          {Object.values(Weather).map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="weather"
                value={value}
                checked={weather === value}
                onChange={() => setWeather(value)}
              />
              {value}
            </label>
          ))}
        </fieldset>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
