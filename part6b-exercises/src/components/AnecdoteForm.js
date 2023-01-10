import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { notifcationChange } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdote(content));
    dispatch(notifcationChange(`Anecdote "${content}" created`));
    setTimeout(() => {
      dispatch(notifcationChange(""));
    }, 4000);
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={addNewAnecdote}>
        <input name="anecdote" />
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
