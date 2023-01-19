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
    vote: 0,
    id: generateId(),
  };
});

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "VOTE":
      const anecdoteToUpdate = state.find((a) => a.id === action.data.id);
      const updateAnecdote = {
        ...anecdoteToUpdate,
        vote: anecdoteToUpdate.vote + 1,
      };

      return state.map((a) => (a.id === action.data.id ? updateAnecdote : a));
    case "NEW":
      const content = action.data.content;
      return [...state, { content, vote: 0, id: generateId() }];
    default:
      return state;
  }
};

// Exercise 6.6
export const addVote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const addAnecdote = (content) => {
  return {
    type: "NEW",
    data: {
      content,
    },
  };
};

export default anecdoteReducer;
