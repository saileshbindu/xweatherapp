import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import './WeatherApp.css'

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'f57a1329dfa145dc9a2135714232811'; 
  const API_URL = 'https://api.weatherapi.com/v1/current.json';

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weatherAppMain">
      <h1 className="text-2xl font-bold mb-4">Weather App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border p-2 mr-2"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>
      {loading && <p>Loading data...</p>}
      {error && (
        <div className='errMsg'>
          <AlertCircle className="mr-4" />
          <span >{error}</span>
        </div>
      )}
      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <h2 className="font-bold">Temperature</h2>
            <p>{weather.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h2 className="font-bold">Humidity</h2>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h2 className="font-bold">Condition</h2>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h2 className="font-bold">Wind Speed</h2>
            <p>{weather.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;