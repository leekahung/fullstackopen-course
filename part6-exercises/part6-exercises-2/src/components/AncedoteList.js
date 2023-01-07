import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/ancedoteReducer";

const Ancedote = ({ ancedote, handleAddVote }) => {
  return (
    <div>
      {ancedote.content}
      <br />
      has {ancedote.vote} <button onClick={handleAddVote}>vote</button>
    </div>
  );
};

const AncedoteList = () => {
  const ancedotes = useSelector((state) => state).sort((a, b) => {
    return b.vote - a.vote;
  });
  const dispatch = useDispatch();

  const handleAddVote = (id) => {
    dispatch(addVote(id));
  };

  return (
    <div>
      {ancedotes.map((a) => {
        return (
          <Ancedote
            key={a.id}
            ancedote={a}
            handleAddVote={() => handleAddVote(a.id)}
          />
        );
      })}
    </div>
  );
};

export default AncedoteList;
