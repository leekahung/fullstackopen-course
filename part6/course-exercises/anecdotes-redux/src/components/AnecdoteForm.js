//import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { runNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch();

  const handleAddAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.addAnecdote(content);

    const message = `Anecdote "${content}" added`;
    props.runNotification(message, 5);
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

const mapDispatchToProps = {
  addAnecdote,
  runNotification,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
