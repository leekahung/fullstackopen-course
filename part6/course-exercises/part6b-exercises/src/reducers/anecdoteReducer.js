import { createSlice } from "@reduxjs/toolkit";

const initialAnecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

const initialState = initialAnecdotes.map((a) => {
  return {
    content: a,
    votes: 0,
    id: generateId(),
  };
});

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload;
      state.push({
        content,
        votes: 0,
        id: generateId(),
      });
    },
    upvoteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToUpdate = state.find((a) => a.id === id);
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      };
      return state.map((a) => (a.id === id ? updatedAnecdote : a));
    },
  },
});

export const { addAnecdote, upvoteAnecdote } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
