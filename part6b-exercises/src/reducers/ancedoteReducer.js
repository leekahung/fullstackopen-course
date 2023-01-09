import { createSlice } from "@reduxjs/toolkit";

const initialAncedotes = [
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

const initialState = initialAncedotes.map((a) => {
  return {
    content: a,
    votes: 0,
    id: generateId(),
  };
});

const ancedoteSlice = createSlice({
  name: "ancedotes",
  initialState,
  reducers: {
    addAncedote(state, action) {
      const content = action.payload;
      state.push({
        content,
        votes: 0,
        id: generateId(),
      });
    },
    upvoteAncedote(state, action) {
      const id = action.payload;
      const ancedoteToUpdate = state.find((a) => a.id === id);
      const updatedAncedote = {
        ...ancedoteToUpdate,
        votes: ancedoteToUpdate.votes + 1,
      };
      return state.map((a) => (a.id === id ? updatedAncedote : a));
    },
  },
});

export const { addAncedote, upvoteAncedote } = ancedoteSlice.actions;

export default ancedoteSlice.reducer;
