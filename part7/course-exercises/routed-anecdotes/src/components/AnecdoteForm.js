const AnecdoteInput = ({ anecdoteInput }) => {
  return (
    <>
      <div>
        <label>
          {anecdoteInput === "url" ? "url for more info" : anecdoteInput}{" "}
        </label>
        <input name={anecdoteInput} />
      </div>
    </>
  );
};

const AnecdoteForm = () => {
  return (
    <>
      <h2>create a new anecdote</h2>
      <form>
        {["content", "author", "url"].map((anecdoteInput) => {
          return (
            <AnecdoteInput key={anecdoteInput} anecdoteInput={anecdoteInput} />
          );
        })}
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
