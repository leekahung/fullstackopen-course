import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { runNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdote(content));
    dispatch(runNotification(`New anecdote "${content}" has been added`, 4000));
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
