import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [showCountry, setShowCountry] = useState(false);
  const [query, setQuery] = useState("");
  const baseUrl = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleQuery = (event) => {
    if (country.length !== 0) {
      setCountry([]);
      setShowCountry(!showCountry);
      setQuery(event.target.value);
    } else {
      setQuery(event.target.value);
    }
  };

  let countriesFiltered =
    query !== "" && showCountry === false
      ? countries.filter((c) =>
          c.name.common.toLowerCase().includes(query.toLowerCase())
        )
      : showCountry
      ? country
      : countries;

  const handleShowCountry = (cca3) => {
    setCountry(countries.filter((c) => c.cca3 === cca3));
    setShowCountry(!showCountry);
  };

  return (
    <div className="App">
      find countries <input value={query} onChange={handleQuery} />
      <div>
        {countriesFiltered.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : countriesFiltered.length > 1 ? (
          countriesFiltered.map((c) => {
            return (
              <div key={c.cca3}>
                {c.name.common}{" "}
                <button onClick={() => handleShowCountry(c.cca3)}>show</button>
              </div>
            );
          })
        ) : showCountry ? (
          <Country country={country[0]} />
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
