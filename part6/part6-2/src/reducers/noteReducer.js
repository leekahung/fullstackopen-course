const noteReducer = (state = [], action) => {
  if (action.type === "NEW_NOTE") {
    return [...state, action.data];
  } else if (action.type === "TOGGLE_IMPORTANCE") {
    const id = action.data.id;
    const noteToUpdate = state.find((note) => note.id === id);
    const updatedNote = {
      ...noteToUpdate,
      important: !noteToUpdate.important,
    };
    return state.map((note) => (note.id === id ? updatedNote : note));
  }

  return state;
};

export default noteReducer;
