import { connect } from "react-redux";
import { updateNote } from "../reducers/noteReducer";

const Note = ({ note, handleToggle }) => {
  return (
    <li onClick={handleToggle}>
      {note.content} <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = (props) => {
  return (
    <ul>
      {props.notes.map((n) => {
        return (
          <Note key={n.id} note={n} handleToggle={() => props.updateNote(n)} />
        );
      })}
    </ul>
  );
};

const mapStateToProps = (state) => {
  if (state.filters === "ALL") {
    return {
      notes: state.notes,
    };
  }

  return {
    notes:
      state.filters === "IMPORTANT"
        ? state.notes.filter((n) => n.important)
        : state.notes.filter((n) => !n.important),
  };
};

const mapDispatchToProps = {
  updateNote,
};

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes);

export default ConnectedNotes;
