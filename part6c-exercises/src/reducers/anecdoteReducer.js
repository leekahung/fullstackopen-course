import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(_state, action) {
      return action.payload;
    },
    upvoteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToUpdate = state.find((a) => a.id === id);
      const updatedanecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      };
      return state.map((a) => (a.id === id ? updatedanecdote : a));
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setAnecdotes, upvoteAnecdote, createAnecdote } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
