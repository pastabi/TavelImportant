function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤️"],
    [[2], "⛅"],
    [[3], "☁️"],
    [[45, 48], "🌫️"],
    [[51, 56, 61, 66, 80], "🌦️"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧️"],
    [[71, 73, 75, 77, 85, 86], "🌨️"],
    [[95], "🌩️"],
    [[96, 99], "⛈️"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function formatDay(date) {
  const formatedDate = new Intl.DateTimeFormat("en", {
    weekday: "short",
    day: "numeric",
  }).format(new Date(date));
  return formatedDate;
}

export function WeatherArea({ weather, isLocationSet }) {
  if (weather.noWeather)
    return (
      <div className="weather-area area-styling">
        <h3>Weather forecast</h3>
        <p className="no-content loading-indicator">
          Something went wrong with getting weather for this location.
        </p>
      </div>
    );

  const {
    precipitation_sum: precipit,
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weather_code: codes,
  } = weather;
  return (
    <div className="weather-area area-styling">
      <h3>Weather forecast</h3>

      {isLocationSet ? (
        <ul className="weather-list">
          {dates?.map((date, i) => (
            <WeatherDay
              date={date}
              max={max.at(i)}
              min={min.at(i)}
              precipit={precipit.at(i)}
              code={codes.at(i)}
              key={date}
            />
          ))}
        </ul>
      ) : (
        <p className="no-content">
          To get weather forecast for your destination, start entering a location name in the search
          field, and when you see the right one - press "Get" button or "Enter" key
        </p>
      )}
    </div>
  );
}
function WeatherDay({ date, max, min, precipit, code }) {
  const dateSeparate = formatDay(date).split(" ", 2);
  return (
    <li>
      <div className="full-date">
        <p className="month-day">{dateSeparate.at(0)}</p>
        <p className="week-day">{dateSeparate.at(1)}</p>
      </div>

      <span className="weather-icon">{getWeatherIcon(code)}</span>
      <span className="temperature">
        <p className="max-temp">{Math.floor(max)}&deg;</p> <p>&Iota;</p>{" "}
        <p>{Math.floor(min)}&deg;</p>
      </span>
      <p className="precipitation">{precipit}mm</p>
    </li>
  );
}
