import NoteForm from "./components/NoteForm";
import NoteFilter from "./components/NoteFilter";
import Notes from "./components/Notes";

function App() {
  return (
    <div className="App">
      <NoteForm />
      <NoteFilter />
      <Notes />
    </div>
  );
}

export default App;
