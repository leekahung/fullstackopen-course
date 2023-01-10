import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdotes";

const App = () => {
  return (
    <div className="App">
      <Anecdotes />
      <AnecdoteForm />
    </div>
  );
};

export default App;
