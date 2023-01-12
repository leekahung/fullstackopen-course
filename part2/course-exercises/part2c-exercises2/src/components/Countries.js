import Country from "./Country";
import CountryInfo from "./CountryInfo";

const Countries = ({ countries, query, setQuery }) => {
  const countriesSorted = countries.sort((a, b) => a.name.common.localeCompare(b.name.common)) 

  const countriesList = countriesSorted.map((country) => {
    return (country.name.common.toLowerCase().includes(query.toLowerCase()))
      ? (<Country
          key={country.cca2} 
          country={country}
          setQuery={setQuery}
        />)
      : null;
  });

  const filterCountries = () => {
    return countriesList.filter(country => country !== null);
  }

  const filteredList = () => {
    return (filterCountries().length > 10)
      ? <tr><td>Too many matches, specify another filter</td></tr>
      : (filterCountries().length === 1)
        ? <CountryInfo country={countriesList.filter(country => country !== null)[0]} />
        : countriesList;
  };

  return (
    <div>
      <table>
        <tbody>{filteredList()}</tbody>
      </table>
    </div>
  );
};

export default Countries;
