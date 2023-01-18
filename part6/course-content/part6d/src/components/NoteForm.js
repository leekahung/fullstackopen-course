import { connect } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NoteForm = (props) => {
  const handleNewNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    props.createNote(content);
  };

  return (
    <form onSubmit={handleNewNote}>
      <input name="note" />
      <button>add</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNote: (value) => {
      dispatch(createNote(value));
    },
  };
};

const ConnectedNoteForm = connect(null, mapDispatchToProps)(NoteForm);

export default ConnectedNoteForm;
