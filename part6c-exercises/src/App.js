import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Anecdotes from "./components/Anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";

import anecdoteService from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div className="App">
      <Anecdotes />
      <AnecdoteForm />
    </div>
  );
};

export default App;
