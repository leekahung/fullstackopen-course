import { useEffect, useState } from "react";
import axios from "axios";
import CountryLanguages from "./CountryLanguages";
import CapitalWeather from "./CapitalWeather";

const CountryInfo = ({ country }) => {
  const countryData = country.props.country;
  const latLon = countryData.capitalInfo["latlng"];

  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latLon[0]}&lon=${latLon[1]}&appid=${api_key}`)
      .then((response) => {
        const weatherData = response.data;
        setWeather(weatherData);
      })
  }, [latLon, api_key]);

  return (
    <>
      <tr>
        <td>
          <h1>{countryData.name.common}</h1>
        </td>
      </tr>
      <tr>
        <td>capital {countryData.capital[0]}</td>
      </tr>
      <tr>
        <td>area {countryData.area}</td>
      </tr>
      <tr>
        <td>
          <h3>languages:</h3>
          <CountryLanguages countryData={countryData} />
        </td>
      </tr>
      <tr>
        <td>
          <img src={countryData.flags["png"]} alt={`flag of ${countryData.name.common}`}/>
        </td>
      </tr>
      <tr>
        <td>
          <h2>Weather in {countryData.capital[0]}</h2>
        </td>
      </tr>
      <CapitalWeather weather={weather} /> 
    </>
  );
}
 
export default CountryInfo;