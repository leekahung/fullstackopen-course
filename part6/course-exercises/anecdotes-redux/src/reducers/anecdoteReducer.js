import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload.id;
      const anecdoteToUpdate = action.payload;
      return state.map((a) => (a.id === id ? anecdoteToUpdate : a));
    },
    setAnecdotes(_state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
