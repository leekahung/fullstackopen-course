import { useSelector, useDispatch } from "react-redux";
import { toggleNoteImportance } from "../reducers/noteReducer";

const Note = ({ note, toggleImportant }) => {
  return (
    <li onClick={toggleImportant}>
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

  const toggleImportant = (id) => {
    dispatch(toggleNoteImportance(id));
  };

  return (
    <div>
      <ul>
        {notes.map((n) => {
          return (
            <Note
              key={n.id}
              note={n}
              toggleImportant={() => toggleImportant(n.id)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Notes;
