import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes);

  return (
    <>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((a) => {
          return (
            <li key={a.id}>
              <Link to={`/anecdotes/${a.id}`}>{a.content}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Anecdotes;
