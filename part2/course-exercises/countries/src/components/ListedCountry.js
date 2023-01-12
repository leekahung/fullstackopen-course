const ListedCountry = ({ country, handleShowCountry }) => {
  return (
    <div key={country.cca3}>
      {country.name.common}{" "}
      <button onClick={() => handleShowCountry(country.cca3)}>show</button>
    </div>
  );
};

export default ListedCountry;
