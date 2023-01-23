import { useState } from "react";
import { useField, useCountry } from "./hooks";

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>;
  }

  return (
    <>
      <h1>{country[0].name.common}</h1>
      <div>population {country[0].population}</div>
      <div>capital {country[0].capital}</div>
      <img
        src={country[0].flags.png}
        height="100px"
        alt={`flag of ${country[0].name.common}`}
      />
    </>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (event) => {
    event.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div className="App">
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
