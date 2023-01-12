import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const countryData = response.data;
      setCountries(countryData);
    });
  }, []);

  return (
    <div className="App">
      <div>
        <form>
          find countries{" "}
          <input
            type="search"
            value={query}
            onChange={handleQuery}
          />
        </form>
      </div>
      <Countries 
        countries={countries}
        query={query}
        setQuery={setQuery}
      />
    </div>
  );
};

export default App;
