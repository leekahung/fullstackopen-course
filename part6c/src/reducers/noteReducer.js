import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    addNote(state, action) {
      state.push(action.payload);
    },
    toggleNoteImportance(state, action) {
      const id = action.payload;
      const noteToUpdate = state.find((n) => n.id === id);
      const updatedNote = {
        ...noteToUpdate,
        important: !noteToUpdate.important,
      };
      return state.map((n) => (n.id === id ? updatedNote : n));
    },
    setNotes(_state, action) {
      return action.payload;
    },
  },
});

export const { addNote, toggleNoteImportance, appendNote, setNotes } =
  noteSlice.actions;

export default noteSlice.reducer;
