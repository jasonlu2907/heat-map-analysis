import React, { useState, useEffect } from "react";
import "./WeatherOverlay.css";

interface WeatherData {
  city_name: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  weather_main: string;
  weather_description: string;
  weather_icon: string;
}

const WeatherOverlay: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch("https://heatmap-analysis.onrender.com/current") // Ensure this matches your backend
      .then((response) => response.json())
      .then((data) => {
        console.log("Weather API Response:", data); // Debugging: check response in console
        console.log("Icon code:", data.current.weather[0].icon);
        if (data.current && data.current.weather && data.current.weather.length > 0) {
          setWeather({
            city_name: "Arlington", // Hardcoded city name
            temp: Math.round(data.current.temp),
            feels_like: Math.round(data.current.feels_like),
            humidity: data.current.humidity,
            wind_speed: Math.round(data.current.wind_speed),
            weather_main: data.current.weather[0].main,
            weather_description: data.current.weather[0].description,
            weather_icon: data.current.weather[0].icon,
            // weather_icon: "10n", // Hardcoded icon code for testing
          });
        }
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }, []);

  if (!weather) return <div className="weather-overlay">Loading weather...</div>;

  return (
    <div className="weather-overlay">
      {/* Weather Description (Centered at Top) */}
      {/* <div className="weather-description">
      <p>{weather.weather_main} - {weather.weather_description}</p>
      </div> */}

      {/* Main Row: Icon & Big Temp on the left, Humidity/Wind on the right */}
      <div className="weather-main-row">
        <div className="weather-left">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather_icon}@2x.png`}
            alt={weather.weather_main}
            className="weather-icon"
          />
          <div className="weather-temp-container">
            <div className="weather-temp">{weather.temp}</div>
            <div className="degree">°F</div>
          </div>
        </div>
        <div className="weather-right">
        <p className="weather-description">{weather.weather_main} - {weather.weather_description}</p>
          <p>Feels Like: {weather.feels_like}°F</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind: {weather.wind_speed} mph</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherOverlay;
