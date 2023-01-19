import { useSelector, useDispatch } from "react-redux";
import { addVote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";

const Anecdote = ({ anecdote, handleAddVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.vote} <button onClick={handleAddVote}>vote</button>
      </div>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    const sortedAnecdotes = state.sort((a, b) => {
      return b.vote - a.vote;
    });
    return sortedAnecdotes;
  });

  return (
    <div className="App">
      <h1>Anecdotes</h1>
      {anecdotes.map((a) => {
        return (
          <Anecdote
            key={a.id}
            anecdote={a}
            handleAddVote={() => dispatch(addVote(a.id))}
          />
        );
      })}
      <AnecdoteForm />
    </div>
  );
};

export default App;
