import { useDispatch } from "react-redux";
import { createNotes } from "../reducers/noteReducer";

const NoteForm = () => {
  const dispatch = useDispatch();
  const handleNewNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(createNotes(content));
  };

  return (
    <form onSubmit={handleNewNote}>
      <input name="note" />
      <button>add</button>
    </form>
  );
};

export default NoteForm;
