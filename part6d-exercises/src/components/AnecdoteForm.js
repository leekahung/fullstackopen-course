import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { runNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleNewAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(runNotification(`Anecdote "${content}" added`, 4000));
  };

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={handleNewAnecdote}>
        <input name="anecdote" />
        <br />
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
