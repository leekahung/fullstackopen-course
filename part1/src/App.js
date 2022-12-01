import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, data }) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{data}</td>
      </tr>
    </>
  );
};

const StatisticStats = ({ total, average, positive }) => {
  return (
    <>
      <tr>
        <td>all</td>
        <td>{total}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{average}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{`${positive} %`}</td>
      </tr>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  return total === 0 ? (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  ) : (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" data={good} />
          <StatisticLine text="neutral" data={neutral} />
          <StatisticLine text="bad" data={bad} />
          <StatisticStats
            total={total}
            average={average.toFixed(2)}
            positive={positive.toFixed(1)}
          />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleClickBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text="good" />
      <Button handleClick={handleClickNeutral} text="neutral" />
      <Button handleClick={handleClickBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
