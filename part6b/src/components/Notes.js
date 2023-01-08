import { useSelector, useDispatch } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, toggleImportance }) => {
  return (
    <li onClick={toggleImportance}>
      {note.content} <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const notes = useSelector((state) => {
    if (state.filter === "ALL") {
      return state.notes;
    }
    return state.filter === "IMPORTANT"
      ? state.notes.filter((n) => n.important)
      : state.notes.filter((n) => !n.important);
  });
  const dispatch = useDispatch();

  return (
    <ul>
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => dispatch(toggleImportanceOf(note.id))}
          />
        );
      })}
    </ul>
  );
};

export default Notes;
