const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

const initialAncedotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const initialState = initialAncedotes.map((a) => {
  return {
    content: a,
    vote: 0,
    id: generateId(),
  };
});

const ancedoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_ANCEDOTE":
      const content = action.data.content;
      return [...state, { content, vote: 0, id: generateId() }];
    case "VOTE":
      const id = action.data.id;
      const ancedoteToUpdate = state.find((a) => a.id === id);
      const updatedAncedote = {
        ...ancedoteToUpdate,
        vote: ancedoteToUpdate.vote + 1,
      };
      return state.map((a) => (a.id === id ? updatedAncedote : a));
    default:
      return state;
  }
};

export const addAncedote = (content) => {
  return {
    type: "NEW_ANCEDOTE",
    data: {
      content,
      vote: 0,
      id: generateId(),
    },
  };
};

export const addVote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export default ancedoteReducer;
