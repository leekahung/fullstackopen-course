import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(_state, action) {
      return action.payload;
    },
    upvoteAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      const id = action.payload.id;
      return state.map((a) => (a.id === id ? updatedAnecdote : a));
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setAnecdotes, upvoteAnecdote, createAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateObject(anecdote);
    dispatch(upvoteAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
