import { Routes, Route, Link } from "react-router-dom";
import Anecdotes from "./components/Anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const style = {
    padding: "5px",
  };

  return (
    <div className="App">
      <h1>Software anecdotes</h1>
      <div>
        <Link style={style} to="/">
          anecdotes
        </Link>
        <Link style={style} to="/create">
          create new
        </Link>
        <Link style={style} to="/about">
          about
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Anecdotes />} />
        <Route path="/create" element={<AnecdoteForm />} />
      </Routes>

      <footer>
        <p>
          Anecdote app. See{" "}
          <a
            href="https://github.com/leekahung/fullstackopen-course/tree/main/part7/course-exercises/routed-anecdotes"
            target="_blank"
            rel="noreferrer"
          >
            this GitHub link
          </a>{" "}
          for the source code.
        </p>
      </footer>
    </div>
  );
};

export default App;
