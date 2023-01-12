import CountryLanguage from "./CountryLanguage";

const CountryLanguages = ({ countryData }) => {
  const langs = countryData.languages;

  return (
    <ul>
      {Object.entries(langs).map(lang => {
        return <CountryLanguage key={lang[0]} language={lang[1]}/>
      })}
    </ul>
  );
};

export default CountryLanguages;
