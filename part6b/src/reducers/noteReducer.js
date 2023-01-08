const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.data];
    case "TOGGLE_IMPORTANCE":
      const id = action.data.id;
      const noteToUpdate = state.find((n) => n.id === id);
      const updatedNote = {
        ...noteToUpdate,
        important: !noteToUpdate.important,
      };
      return state.map((n) => (n.id === id ? updatedNote : n));
    default:
      return state;
  }
};

export const addNote = (content) => {
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
