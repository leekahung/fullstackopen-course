import { useDispatch } from "react-redux";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/ancedotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAddAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAncedote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAncedote));

    const message = `Anecdote "${content}" added`;
    const timeoutID = setTimeout(() => dispatch(clearNotification()), 5000);
    const notification = {
      message,
      timeoutID,
    };
    dispatch(setNotification(notification));
  };

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
