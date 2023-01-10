import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.create(content);
    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`New anecdote "${content}" has been added`));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 2000);
  };

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={handleNewAnecdote}>
        <input name="anecdote" />
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
