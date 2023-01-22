import { useSelector } from "react-redux";

const Anecdote = ({ anecdote }) => {
  return <li>{anecdote.content}</li>;
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes);

  return (
    <>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((a) => {
          return <Anecdote key={a.id} anecdote={a} />;
        })}
      </ul>
    </>
  );
};

export default Anecdotes;
