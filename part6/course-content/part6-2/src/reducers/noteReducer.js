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

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    data: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    data: { id },
  };
};

export default noteReducer;
