const FeedbackButtons = ({ group, handleDispatch }) => {
  return <button onClick={() => handleDispatch(group)}>{group}</button>;
};

const FeedbackResults = ({ group, groupState }) => {
  return (
    <tr>
      <td>{group}</td>
      <td>{groupState}</td>
    </tr>
  );
};

const App = ({ store }) => {
  const appState = store.getState();

  const handleDispatch = (group) => {
    store.dispatch({ type: `${group.toUpperCase()}` });
  };

  return (
    <div className="App">
      <h1>give feedback</h1>
      {["good", "ok", "bad"].map((group) => {
        return (
          <FeedbackButtons
            key={group}
            group={group}
            handleDispatch={handleDispatch}
          />
        );
      })}
      <h1>statistics</h1>
      <table>
        <tbody>
          {["good", "ok", "bad"].map((group) => {
            return (
              <FeedbackResults
                key={group}
                group={group}
                groupState={appState[group]}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
