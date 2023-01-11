import { useSelector, useDispatch } from "react-redux";
import { updateNotes } from "../reducers/noteReducer";

const Note = ({ note, handleToggle }) => {
  return (
    <li onClick={handleToggle}>
      {note.content} <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const notes = useSelector((state) => {
    if (state.filters === "ALL") {
      return state.notes;
    }
    return state.filters === "IMPORTANT"
      ? state.notes.filter((n) => n.important)
      : state.notes.filter((n) => !n.important);
  });
  const dispatch = useDispatch();

  return (
    <ul>
      {notes.map((n) => {
        return (
          <Note
            key={n.id}
            note={n}
            handleToggle={() => dispatch(updateNotes(n))}
          />
        );
      })}
    </ul>
  );
};

export default Notes;
