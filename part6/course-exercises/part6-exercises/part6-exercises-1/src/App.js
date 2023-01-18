const App = ({ store }) => {
  const appState = store.getState();
  const good = appState.good;
  const ok = appState.ok;
  const bad = appState.bad;
  const total = good + ok + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <div className="App">
      <h1>give feedback</h1>
      <button onClick={() => store.dispatch({ type: "GOOD" })}>good</button>
      <button onClick={() => store.dispatch({ type: "OK" })}>ok</button>
      <button onClick={() => store.dispatch({ type: "BAD" })}>bad</button>
      <button onClick={() => store.dispatch({ type: "ZERO" })}>reset</button>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>ok</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average ? average.toFixed(1) : 0}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive ? positive.toFixed(1) : 0} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
