import { useEffect, useState } from "react";
import noteServices from "./services/note";
import Note from "./components/Note";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("some error happened");

  useEffect(() => {
    noteServices.getAll().then((returnedNotes) => {
      setNotes(returnedNotes);
    });
  }, []);

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

    noteServices
      .update(id, updateNote)
      .then((updatedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)));
      })
      .catch((error) => {
        setErrorMessage(`Note "${note.content}" was already removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
      <Footer />
    </div>
  );
};

export default App;
