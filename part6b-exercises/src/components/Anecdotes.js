import { useSelector, useDispatch } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdoteReducer";
import { notifcationChange } from "../reducers/notificationReducer";
import Notification from "./Notification";
import Filter from "./Filter";

const Anecdote = ({ anecdote, handleUpvote }) => {
  return (
    <div>
      {anecdote.content}
      <br />
      has {anecdote.votes} <button onClick={handleUpvote}>vote</button>
    </div>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) => {
    const allAnecdotes = state.anecdotes.slice();
    const sortedAnecdotes = allAnecdotes.sort(function (a, b) {
      return b.votes - a.votes;
    });
    if (state.filters !== "") {
      return sortedAnecdotes.filter((a) =>
        a.content.toLowerCase().includes(state.filters)
      );
    }
    return sortedAnecdotes;
  });
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <div>
        {anecdotes.map((a) => {
          return (
            <Anecdote
              key={a.id}
              anecdote={a}
              handleUpvote={() => {
                dispatch(upvoteAnecdote(a.id));
                dispatch(notifcationChange(`You voted "${a.content}"`));
                setTimeout(() => {
                  dispatch(notifcationChange(""));
                }, 4000);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Anecdotes;
