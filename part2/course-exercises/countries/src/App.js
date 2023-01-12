import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const baseUrl = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  const countriesFiltered =
    query !== ""
      ? countries.filter((c) =>
          c.name.common.toLowerCase().includes(query.toLowerCase())
        )
      : countries;

  return (
    <div className="App">
      find countries <input value={query} onChange={handleQuery} />
      <div>
        {countriesFiltered.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : countriesFiltered.length > 1 ? (
          countriesFiltered.map((c) => {
            return <div key={c.cca3}>{c.name.common}</div>;
          })
        ) : countriesFiltered.length === 1 ? (
          <Country country={countriesFiltered[0]} />
        ) : (
          <div>No matching countries, specify another filter</div>
        )}
      </div>
    </div>
  );
};

export default App;
