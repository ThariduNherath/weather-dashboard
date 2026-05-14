import React from 'react';
import { WEATHER_ICONS } from '../../utils/constants';
import '../../styles/Forecast.css';

const Forecast = ({ forecastData, unit }) => {
  if (!forecastData || !forecastData.list) return null;

  // Get unique days from forecast
  const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="forecast">
      {dailyForecasts.map((day, index) => (
        <div key={index} className="forecast-item">
          <div className="forecast-day">{formatDay(day.dt)}</div>
          <div className="forecast-icon">
            {WEATHER_ICONS[day.weather[0].icon] || '☀️'}
          </div>
          <div className="forecast-temps">
            <span className="forecast-high">{Math.round(day.main.temp_max)}{tempUnit}</span>
            <span className="forecast-low">{Math.round(day.main.temp_min)}{tempUnit}</span>
          </div>
          <div className="forecast-desc">
            {day.weather[0].description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;