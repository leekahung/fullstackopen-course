import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NoteForm = () => {
  const dispatch = useDispatch();

  const addNewNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNewNote}>
      <input name="note" />
      <button>add</button>
    </form>
  );
};

export default NoteForm;
