import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { runNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Exercise 7.6
  const { clearValue: clearContent, ...content } = useField("text");
  const { clearValue: clearAuthor, ...author } = useField("text");
  const { clearValue: clearUrl, ...url } = useField("text");

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

  const handleFormReset = (event) => {
    event.preventDefault();
    clearContent();
    clearAuthor();
    clearUrl();
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
        <button onClick={handleFormReset}>reset</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
