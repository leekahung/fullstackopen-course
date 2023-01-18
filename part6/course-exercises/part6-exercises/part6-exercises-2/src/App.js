import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";

const App = () => {
  return (
    <div className="App">
      <h1>Anecdotes</h1>
      <AnecdoteList />
      <br />
      <AnecdoteForm />
    </div>
  );
};

export default App;
