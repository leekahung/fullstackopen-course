import { useState } from "react";

const Feedback = ({ handleFeedback }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => handleFeedback("good")}>good</button>
      <button onClick={() => handleFeedback("neutral")}>neutral</button>
      <button onClick={() => handleFeedback("bad")}>bad</button>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = good / all;

  return (
    <div>
      <h1>statistics</h1>
      {all > 0 ? (
        <>
          <div>good {good}</div>
          <div>neutral {neutral}</div>
          <div>bad {bad}</div>
          <div>all {all}</div>
          <div>average {average ? average : 0}</div>
          <div>positive {positive ? positive : 0} %</div>
        </>
      ) : (
        <div>No feedback given</div>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleFeedback = (feedback) => {
    switch (feedback) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
    }
  };

  return (
    <div>
      <Feedback handleFeedback={handleFeedback} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
