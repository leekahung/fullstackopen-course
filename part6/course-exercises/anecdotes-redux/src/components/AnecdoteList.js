import { useSelector, useDispatch } from "react-redux";
import { addVote, setAnecdotes } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleAddVote = async (anecdote) => {
    dispatch(addVote(anecdote.id));

    const message = `You voted for "${anecdote.content}"`;
    const timeoutID = setTimeout(() => dispatch(clearNotification()), 5000);
    const notification = {
      message,
      timeoutID,
    };
    dispatch(setNotification(notification));
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        had {anecdote.votes}{" "}
        <button onClick={() => handleAddVote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const sortedAnecdotes = state.anecdotes.slice().sort((a, b) => {
      return b.vote - a.vote;
    });

    const filteredAnecdotes = state.filters
      ? sortedAnecdotes.filter((a) =>
          a.content.toLowerCase().includes(state.filters.toLowerCase())
        )
      : sortedAnecdotes;

    return filteredAnecdotes;
  });

  return (
    <>
      {anecdotes.map((a) => {
        return <Anecdote key={a.id} anecdote={a} />;
      })}
    </>
  );
};

export default AnecdoteList;
