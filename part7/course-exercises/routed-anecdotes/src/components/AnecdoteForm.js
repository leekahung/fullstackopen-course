import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { runNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const content = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleAddAnecdote = (event) => {
    event.preventDefault();
    const newAnecdote = {
      content: content.value,
      author: author.value,
      url: url.value,
    };

    dispatch(addAnecdote(newAnecdote));
    dispatch(
      runNotification(`a new anecdote "${newAnecdote.content}" is created!`, 5)
    );
    navigate("/");
  };

  return (
    <>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleAddAnecdote} autoComplete="off">
        <div>
          <label>content: </label>
          <input {...content} />
        </div>
        <div>
          <label>author: </label>
          <input {...author} />
        </div>
        <div>
          <label>url for more info: </label>
          <input {...url} />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
