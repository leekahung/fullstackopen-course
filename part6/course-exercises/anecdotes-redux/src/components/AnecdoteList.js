import { useSelector, useDispatch } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdoteReducer";
import { runNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const handleAddVote = async (anecdote) => {
    dispatch(upvoteAnecdote(anecdote));

    const message = `You voted for "${anecdote.content}"`;
    dispatch(runNotification(message, 5));
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
      return b.votes - a.votes;
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
