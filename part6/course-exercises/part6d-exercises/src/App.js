import { useDispatch } from "react-redux";
import { useEffect } from "react";

import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdotes";

import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div className="App">
      <Anecdotes />
      <AnecdoteForm />
    </div>
  );
};

export default App;
