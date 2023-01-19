import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

// Exercise 6.7
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAddAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdote(content));
  };

  return (
    <form onSubmit={handleAddAnecdote}>
      <input name="anecdote" />
      <button>add</button>
    </form>
  );
};

export default AnecdoteForm;
