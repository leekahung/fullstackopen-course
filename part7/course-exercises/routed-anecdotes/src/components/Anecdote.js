import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Anecdote = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const id = useParams().id;
  const anecdote = anecdotes.find((a) => a.id === id);

  return (
    <>
      <h1>
        {anecdote.content} by {anecdote.author}
      </h1>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see{" "}
        <a href={anecdote.url} target="_blank" rel="noreferrer">
          {anecdote.url}
        </a>
      </p>
    </>
  );
};

export default Anecdote;
