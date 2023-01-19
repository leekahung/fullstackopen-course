import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      const anecdoteToUpdate = state.find((a) => a.id === id);
      const updateAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      };

      return state.map((a) => (a.id === id ? updateAnecdote : a));
    },
    addAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload,
        votes: 0,
      };

      state.push(newAnecdote);
    },
    setAnecdotes(_state, action) {
      return action.payload;
    },
  },
});

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
