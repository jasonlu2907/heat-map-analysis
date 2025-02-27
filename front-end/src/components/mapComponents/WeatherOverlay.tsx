import React, { useState, useEffect } from "react";
import "./WeatherOverlay.css"; 

interface WeatherData {
  city_name: string;
  temp: number;
  weather_main: string;
  weather_description: string;
  weather_icon: string;
}

const WeatherOverlay: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/current") // Ensure this matches your backend
      .then((response) => response.json())
      .then((data) => {
        console.log("Weather API Response:", data); // Debugging: check response in console

        if (data.current && data.current.weather && data.current.weather.length > 0) {
          setWeather({
            city_name: "Arlington", // Hardcoded (OpenWeather doesn’t provide city name)
            temp: Math.round(data.current.temp - 273.15), // Convert Kelvin to Celsius
            weather_main: data.current.weather[0].main,
            weather_description: data.current.weather[0].description,
            weather_icon: data.current.weather[0].icon,
          });
        }
      })      
      .catch((error) => console.error("Error fetching weather data:", error));
  }, []);

  if (!weather) return <div className="weather-overlay">Loading weather...</div>;

  return (
    <div className="weather-overlay">
      <h3>{weather.city_name}</h3>
      <p>{weather.temp}°C</p>
      <p>{weather.weather_main} - {weather.weather_description}</p>
      <img 
        src={`https://openweathermap.org/img/wn/${weather.weather_icon}.png`} 
        alt={weather.weather_main} 
      />
    </div>
  );
  

};

export default WeatherOverlay;


