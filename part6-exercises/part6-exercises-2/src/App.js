import AncedoteForm from "./components/AncedoteForm";
import AncedoteList from "./components/AncedoteList";

const App = () => {
  return (
    <div className="App">
      <h1>Ancedotes</h1>
      <AncedoteList />
      <br />
      <AncedoteForm />
    </div>
  );
};

export default App;
