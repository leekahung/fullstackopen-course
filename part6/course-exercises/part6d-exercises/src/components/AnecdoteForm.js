import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { runNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const handleNewAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.createAnecdote(content);
    props.runNotification(`Anecdote "${content}" added`, 5000);
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

export default connect(null, {
  createAnecdote,
  runNotification,
})(AnecdoteForm);
