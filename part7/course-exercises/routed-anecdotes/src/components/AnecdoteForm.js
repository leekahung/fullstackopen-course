import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { runNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";

const AnecdoteInput = ({ anecdoteInput }) => {
  return (
    <>
      <div>
        <label>
          {anecdoteInput === "url" ? "url for more info" : anecdoteInput}{" "}
        </label>
        <input name={anecdoteInput} />
      </div>
    </>
  );
};

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddAnecdote = (event) => {
    event.preventDefault();
    const newAnecdote = {};

    ["content", "author", "url"].forEach((formInput) => {
      return (newAnecdote[formInput] = event.target[formInput].value);
    });

    ["content", "author", "url"].forEach((formInput) => {
      return (event.target[formInput].value = "");
    });

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
        {["content", "author", "url"].map((anecdoteInput) => {
          return (
            <AnecdoteInput key={anecdoteInput} anecdoteInput={anecdoteInput} />
          );
        })}
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
