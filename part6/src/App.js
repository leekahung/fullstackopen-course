import { useState } from "react";
import { createStore } from "redux";

const countReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

const store = createStore(countReducer);

console.log(store.getState());
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
console.log(store.getState());
store.dispatch({ type: "DECREMENT" });
console.log(store.getState());
store.dispatch({ type: "ZERO" });
store.dispatch({ type: "DECREMENT" });
console.log(store.getState());

function App() {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
  };

  const handleReset = () => {
    setCounter(0);
  };

  return (
    <div className="App">
      <div>{counter}</div>
      <button onClick={handleIncrement}>plus</button>
      <button onClick={handleDecrement}>minus</button>
      <button onClick={handleReset}>zero</button>
    </div>
  );
}

export default App;
