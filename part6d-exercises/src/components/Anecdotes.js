import { useDispatch, useSelector } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdoteReducer";
import { runNotification } from "../reducers/notificationReducer";

import Filter from "./Filter";
import Notification from "./Notification";

const Anecdote = ({ anecdote, handleUpvote }) => {
  return (
    <div>
      {anecdote.content}
      <br />
      has {anecdote.votes} votes <button onClick={handleUpvote}>vote</button>
    </div>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  function sortByVote(a, b) {
    return b.votes - a.votes;
  }

  const anecdotes = useSelector((state) => {
    if (state.filters === "") {
      return [...state.anecdotes].sort((a, b) => sortByVote(a, b));
    }
    return [...state.anecdotes]
      .filter((a) => a.content.includes(state.filters))
      .sort((a, b) => sortByVote(a, b));
  });

  const handleUpvote = (anecdote) => {
    dispatch(upvoteAnecdote(anecdote));
    dispatch(runNotification(`You voted for "${anecdote.content}"`, 4000));
  };

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      {anecdotes.map((a) => {
        return (
          <Anecdote
            key={a.id}
            anecdote={a}
            handleUpvote={() => handleUpvote(a)}
          />
        );
      })}
    </div>
  );
};

export default Anecdotes;
