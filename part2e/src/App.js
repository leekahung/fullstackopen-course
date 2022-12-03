import { useEffect, useState } from "react";
import noteServices from "./services/note";
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    noteServices.getAll().then((returnedNotes) => {
      setNotes(returnedNotes);
    });
  }, []);

  console.log(notes);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const toggleImportant = () => {
    setShowAll(!showAll);
  };

  const handleNewNote = (event) => {
    setNewNote(event.target.value);
  };

  const handleAddNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteServices.create(noteObject).then((newNoteObject) => {
      setNotes(notes.concat(newNoteObject));
      setNewNote("");
    });
  };

  const handleImportanceChange = (id) => {
    const note = notes.find((n) => n.id === id);
    const updateNote = { ...note, important: !note.important };

    noteServices.update(id, updateNote).then((updatedNote) => {
      setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)));
    });
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      <button onClick={toggleImportant}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              handleImportanceChange={handleImportanceChange}
            />
          );
        })}
      </ul>
      <div>
        <form onSubmit={handleAddNote}>
          <input value={newNote} onChange={handleNewNote} />
          <button>save</button>
        </form>
      </div>
    </div>
  );
};

export default App;
