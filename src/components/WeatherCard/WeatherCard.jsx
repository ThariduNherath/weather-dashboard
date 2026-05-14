import React from 'react';
import { Thermometer, Droplets, Eye, Wind } from 'lucide-react';
import { WEATHER_ICONS } from '../../utils/constants';
import '../../styles/WeatherCard.css';

const WeatherCard = ({ weatherData, unit }) => {
  if (!weatherData) return null;

  const {
    name,
    sys,
    main,
    weather,
    wind,
    visibility
  } = weatherData;

  const weatherIcon = WEATHER_ICONS[weather[0].icon] || '☀️';
  const temperature = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location">
          <h2>{name}, {sys.country}</h2>
          <p className="weather-description">
            {weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}
          </p>
        </div>
        <div className="weather-icon">
          <span className="icon">{weatherIcon}</span>
        </div>
      </div>

      <div className="temperature-section">
        <div className="current-temp">
          {temperature}
          <span className="temp-unit">{tempUnit}</span>
        </div>
        <div className="feels-like">
          Feels like {feelsLike}{tempUnit}
        </div>
      </div>

      <div className="weather-stats">
        <div className="stat-item">
          <Thermometer className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Min/Max</span>
            <span className="stat-value">
              {Math.round(main.temp_min)}/{Math.round(main.temp_max)}{tempUnit}
            </span>
          </div>
        </div>

        <div className="stat-item">
          <Droplets className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Humidity</span>
            <span className="stat-value">{main.humidity}%</span>
          </div>
        </div>

        <div className="stat-item">
          <Wind className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Wind</span>
            <span className="stat-value">{wind.speed} {speedUnit}</span>
          </div>
        </div>

        <div className="stat-item">
          <Eye className="stat-icon" />
          <div className="stat-info">
            <span className="stat-label">Visibility</span>
            <span className="stat-value">{(visibility / 1000).toFixed(1)} km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;