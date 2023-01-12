const Language = ({ language }) => {
  return <li>{language}</li>;
};

const Languages = ({ country }) => {
  const allLanguages = Object.entries(country.languages);

  return (
    <ul>
      {allLanguages.map((lang) => {
        return <Language key={lang[0]} language={lang[1]} />;
      })}
    </ul>
  );
};

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
      </div>
      <h3>languages</h3>
      <Languages country={country} />
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </div>
  );
};

export default Country;
