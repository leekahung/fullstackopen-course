const Country = ({ country, setQuery }) => {
  const handleShowCountryInfo = () => {
    setQuery(country.name.common.toLowerCase());
  }

  return (
    <tr>
      <td>
        {country.name.common}
        <button onClick={handleShowCountryInfo}>
          show
        </button>
      </td>
    </tr>
  );
}
 
export default Country;