import { useDispatch } from "react-redux";
import { addNote } from "../reducers/noteReducer";

const NoteForm = () => {
  const dispatch = useDispatch();

  const handleAddNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(addNote(content));
  };

  return (
    <form onSubmit={handleAddNote}>
      <input name="note" />
      <button>add note</button>
    </form>
  );
};

export default NoteForm;
