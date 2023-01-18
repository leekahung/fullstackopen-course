import { createSlice } from "@reduxjs/toolkit";

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

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote(state, action) {
      const content = action.payload;
      state.push({
        content,
        important: false,
        id: generateId(),
      });
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToUpdate = state.find((n) => n.id === id);
      const updatedNote = {
        ...noteToUpdate,
        important: !noteToUpdate.important,
      };
      return state.map((n) => (n.id === id ? updatedNote : n));
    },
  },
});

export const { addNote, toggleImportanceOf } = noteSlice.actions;

export default noteSlice.reducer;
