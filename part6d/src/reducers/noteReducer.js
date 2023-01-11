import { createSlice } from "@reduxjs/toolkit";
import noteService from "../services/notes";

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    setNotes(_state, action) {
      return action.payload;
    },
    addNotes(state, action) {
      state.push(action.payload);
    },
    toggleImportance(state, action) {
      const noteToUpdate = action.payload;
      const id = action.payload.id;
      return state.map((n) => (n.id === id ? noteToUpdate : n));
    },
  },
});

export const { setNotes, addNotes, toggleImportance } = noteSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNotes = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(addNotes(newNote));
  };
};

export const updateNotes = (note) => {
  return async (dispatch) => {
    const updatedNote = await noteService.updateObject(note);
    dispatch(toggleImportance(updatedNote));
  };
};

export default noteSlice.reducer;
