import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleAddVote }) => {
  return (
    <div>
      {anecdote.content}
      <br />
      has {anecdote.vote} <button onClick={handleAddVote}>vote</button>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state).sort((a, b) => {
    return b.vote - a.vote;
  });
  const dispatch = useDispatch();

  const handleAddVote = (id) => {
    dispatch(addVote(id));
  };

  return (
    <div>
      {anecdotes.map((a) => {
        return (
          <Anecdote
            key={a.id}
            anecdote={a}
            handleAddVote={() => handleAddVote(a.id)}
          />
        );
      })}
    </div>
  );
};

export default AnecdoteList;
