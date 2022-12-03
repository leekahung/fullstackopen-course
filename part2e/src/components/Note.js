const Note = ({ note, handleImportanceChange }) => {
  return (
    <li>
      {note.content}
      <button onClick={() => handleImportanceChange(note.id)}>
        make {!note.important ? "not important" : "important"}
      </button>
    </li>
  );
};

export default Note;
