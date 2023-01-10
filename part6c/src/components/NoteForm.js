import { useDispatch } from "react-redux";
import { addNote } from "../reducers/noteReducer";
import noteService from "../services/notes";

const NoteForm = () => {
  const dispatch = useDispatch();

  const addNewNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    const newNote = await noteService.createNew(content);
    dispatch(addNote(newNote));
  };

  return (
    <form onSubmit={addNewNote}>
      <input name="note" />
      <button>add</button>
    </form>
  );
};

export default NoteForm;
