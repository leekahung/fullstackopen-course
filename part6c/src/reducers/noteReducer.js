import { createSlice } from "@reduxjs/toolkit";
import noteService from "../services/notes";

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
    appendNote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addNote, toggleNoteImportance, setNotes, appendNote } =
  noteSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  };
};

export default noteSlice.reducer;
