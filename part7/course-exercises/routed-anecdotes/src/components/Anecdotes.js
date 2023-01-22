const Anecdote = ({ anecdote }) => {
  return <li>{anecdote}</li>;
};

const Anecdotes = () => {
  const anecdotesInitial = [
    "If it hurts, do it more often",
    "Premature optimization is the route of all evil",
  ];

  return (
    <>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotesInitial.map((a) => {
          return <Anecdote key={a} anecdote={a} />;
        })}
      </ul>
    </>
  );
};

export default Anecdotes;
