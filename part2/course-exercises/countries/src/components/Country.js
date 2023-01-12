import axios from "axios";
import { useEffect, useState } from "react";

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

const Weather = ({ weather }) => {
  let temp = weather.main?.temp - 273.15;
  let condArr = (weather.weather ?? [])[0];
  let condImg = condArr
    ? {
        src: `http://openweathermap.org/img/wn/${condArr.icon}@2x.png`,
        alt: condArr.description,
      }
    : {
        src: "",
        alt: "",
      };
  let windSpeed = weather.wind?.speed;

  return (
    <div>
      <div>temperature {temp.toFixed(2)} Celcius</div>
      <img src={condImg.src} alt={condImg.alt} />
      <div>wind {windSpeed} m/s</div>
    </div>
  );
};

const Country = ({ country }) => {
  const [weather, setWeather] = useState([]);

  const latLon = country.capitalInfo.latlng;
  const apiKey = process.env.REACT_APP_API_KEY;
  let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latLon[0]}&lon=${latLon[1]}&appid=${apiKey}`;

  useEffect(() => {
    axios.get(weatherUrl).then((response) => {
      setWeather(response.data);
    });
  }, [weatherUrl, apiKey]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
      </div>
      <h3>languages:</h3>
      <Languages country={country} />
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <h3>Weather in {country.capital}</h3>
      <Weather weather={weather} />
    </div>
  );
};

export default Country;
