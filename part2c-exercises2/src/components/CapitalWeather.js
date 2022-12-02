const CapitalWeather = ({ weather }) => {
  let temp = (weather.main?.temp - 273.15).toFixed(2);
  let conditionArr = (weather.weather ?? [])[0];
  let weatherImgSrc;
  let weatherImgAlt;
  if (conditionArr === undefined) {
    weatherImgSrc = null;
    weatherImgAlt = null;
  } else {
    weatherImgSrc = `http://openweathermap.org/img/wn/${conditionArr.icon}@2x.png`;
    weatherImgAlt = conditionArr.description;
  }
  let windSpeed = weather.wind?.speed;

  return (
    <>
      <tr>
        <td>
          temperature {temp} Celcius
        </td>
      </tr>
      <tr>
        <td>
          {conditionArr
            ? <img src={weatherImgSrc} alt={weatherImgAlt}/>
            : null
          }
        </td>
      </tr>
      <tr>
        <td>wind {windSpeed} m/s</td>
      </tr>
    </>
  );
};

export default CapitalWeather;
