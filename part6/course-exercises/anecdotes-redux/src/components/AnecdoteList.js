import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleAddVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        had {anecdote.vote} <button onClick={handleAddVote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    const sortedAnecdotes = state.anecdotes.sort((a, b) => {
      return b.vote - a.vote;
    });

    return sortedAnecdotes;
  });

  return (
    <>
      {anecdotes.map((a) => {
        return (
          <Anecdote
            key={a.id}
            anecdote={a}
            handleAddVote={() => dispatch(addVote(a.id))}
          />
        );
      })}
    </>
  );
};

export default AnecdoteList;
