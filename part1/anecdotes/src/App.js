import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(7).fill(0));
  const [mostVotes, setMostVotes] = useState(0);

  const handleNew = () => {
    let currIndex = selected;
    while (currIndex === selected) {
      currIndex = Math.floor(Math.random() * anecdotes.length);
    }

    setSelected(currIndex);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    console.log(newVotes);

    const newMostVotes = Math.max(...newVotes);
    const indexAtMostVotes = newVotes.indexOf(newMostVotes);

    setVotes(newVotes);
    setMostVotes(indexAtMostVotes);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNew}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVotes]}</div>
    </>
  );
};

export default App;
