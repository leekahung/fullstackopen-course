import { createSlice } from "@reduxjs/toolkit";

const anecdotesInitial = [
  "If it hurts, do it more often",
  "Premature optimization is the route of all evil",
];

const generateId = () => {
  return Number(Math.random() * 1000000).toFixed(0);
};

const initialAnecdotes = anecdotesInitial.map((a) => {
  return {
    content: a,
    author: "author 1",
    url: "some url",
    votes: 0,
    id: generateId(),
  };
});

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: initialAnecdotes,
  reducers: {
    setAnecdotes(_state, action) {
      return action.payload;
    },
    addAnecdote(state, action) {
      state.push({ ...action.payload, votes: 0, id: generateId() });
    },
  },
});

export const { setAnecdotes, addAnecdote } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
