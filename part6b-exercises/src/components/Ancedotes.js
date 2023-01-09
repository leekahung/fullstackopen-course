import { useSelector, useDispatch } from "react-redux";
import { upvoteAncedote } from "../reducers/ancedoteReducer";
import { notifcationChange } from "../reducers/notificationReducer";
import Notification from "./Notification";
import Filter from "./Filter";

const Ancedote = ({ ancedote, handleUpvote }) => {
  return (
    <div>
      {ancedote.content}
      <br />
      has {ancedote.votes} <button onClick={handleUpvote}>vote</button>
    </div>
  );
};

const Ancedotes = () => {
  const ancedotes = useSelector((state) => {
    const allAncedotes = state.ancedotes.slice();
    const sortedAncedotes = allAncedotes.sort(function (a, b) {
      return b.votes - a.votes;
    });
    if (state.filters !== "") {
      return sortedAncedotes.filter((a) =>
        a.content.toLowerCase().includes(state.filters)
      );
    }
    return sortedAncedotes;
  });
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Ancedotes</h1>
      <Notification />
      <Filter />
      <div>
        {ancedotes.map((a) => {
          return (
            <Ancedote
              key={a.id}
              ancedote={a}
              handleUpvote={() => {
                dispatch(upvoteAncedote(a.id));
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

export default Ancedotes;
