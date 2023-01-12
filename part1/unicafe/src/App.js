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

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {text === "positive" ? value * 100 : value}{" "}
        {text === "positive" ? "%" : ""}
      </td>
    </tr>
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
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average ? average : 0} />
            <StatisticLine text="positive" value={positive ? positive : 0} />
          </tbody>
        </table>
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
