// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import Forecast from '../Forecast/Forecast.jsx';
import Highlights from '../Highlights/Highlights.jsx';
import Loading from '../Loading/Loading.jsx';
import UnitToggle from '../UnitToggle/UnitToggle.jsx';
import { Cloud, CloudRain, Sun, CloudSnow } from 'lucide-react';
import '../../styles/Dashboard.css';

const Dashboard = ({
  weatherData,
  forecastData,
  loading,
  error,
  unit,
  city,
  handleSearch,
  handleUnitChange,
  getCurrentLocation,
  children // <-- මේක තමයි ChatBot එක ගන්නේ
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedBackground, setAnimatedBackground] = useState('default');

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update background based on weather
  useEffect(() => {
    if (weatherData) {
      const condition = weatherData.weather[0].main.toLowerCase();
      if (condition.includes('rain')) setAnimatedBackground('rainy');
      else if (condition.includes('cloud')) setAnimatedBackground('cloudy');
      else if (condition.includes('snow')) setAnimatedBackground('snowy');
      else setAnimatedBackground('sunny');
    }
  }, [weatherData]);

  if (loading) {
    return <Loading />;
  }

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`dashboard ${animatedBackground}`}>
      {/* Animated Background Elements */}
      <div className="background-elements">
        <div className="floating-clouds">
          <Cloud className="cloud cloud-1" />
          <Cloud className="cloud cloud-2" />
          <Cloud className="cloud cloud-3" />
        </div>
        {animatedBackground === 'rainy' && (
          <div className="rain-effect">
            {[...Array(50)].map((_, i) => (
              <div key={i} className="rain-drop" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`
              }} />
            ))}
          </div>
        )}
        {animatedBackground === 'snowy' && (
          <div className="snow-effect">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="snow-flake" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 5}s`
              }} />
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-container">
        {/* Header Section */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-main">
              <h1 className="dashboard-title">
                <span className="title-gradient">WeatherFlow</span>
                <span className="title-badge">Live</span>
              </h1>
              <div className="time-display">
                <div className="current-time">{formattedTime}</div>
                <div className="current-date">{formattedDate}</div>
              </div>
            </div>
            <div className="header-stats">
              <div className="stat-item">
                <Sun size={18} />
                <span>Real-time Updates</span>
              </div>
              <div className="stat-item">
                <CloudRain size={18} />
                <span>Global Coverage</span>
              </div>
            </div>
          </div>
        </header>

        {/* Controls Section */}
        <section className="dashboard-controls">
          <div className="controls-main">
            <SearchBar 
              onSearch={handleSearch}
              onLocationClick={getCurrentLocation}
              currentCity={city}
            />
          </div>
          <div className="controls-side">
            <UnitToggle unit={unit} onUnitChange={handleUnitChange} />
          </div>
        </section>

        {/* Error Banner */}
        {error && (
          <div className="error-banner">
            <div className="error-content">
              <span className="error-icon">⚠️</span>
              <span className="error-text">{error}</span>
            </div>
          </div>
        )}

        {/* Main Content */}
        {weatherData && (
          <main className="dashboard-content">
            {/* Current Weather Section */}
            <section className="current-weather-section">
              <WeatherCard weatherData={weatherData} unit={unit} />
            </section>

            {/* Details Grid */}
            <section className="details-grid">
              {/* Forecast Panel */}
              <div className="detail-panel forecast-panel">
                <div className="panel-header">
                  <h3 className="panel-title">
                    <CloudSnow className="panel-icon" />
                    5-Day Forecast
                  </h3>
                  <div className="panel-subtitle">Extended weather outlook</div>
                </div>
                <div className="panel-content">
                  <Forecast forecastData={forecastData} unit={unit} />
                </div>
              </div>

              {/* Highlights Panel */}
              <div className="detail-panel highlights-panel">
                <div className="panel-header">
                  <h3 className="panel-title">
                    <Sun className="panel-icon" />
                    Today's Highlights
                  </h3>
                  <div className="panel-subtitle">Key weather metrics</div>
                </div>
                <div className="panel-content">
                  <Highlights weatherData={weatherData} unit={unit} />
                </div>
              </div>
            </section>

            {/* Additional Info Section */}
            <section className="additional-info">
              <div className="info-card">
                <div className="info-icon">🌡️</div>
                <div className="info-content">
                  <div className="info-label">Real Feel</div>
                  <div className="info-value">
                    {Math.round(weatherData.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}
                  </div>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">👁️</div>
                <div className="info-content">
                  <div className="info-label">Visibility</div>
                  <div className="info-value">
                    {(weatherData.visibility / 1000).toFixed(1)} km
                  </div>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">💨</div>
                <div className="info-content">
                  <div className="info-label">Wind Gusts</div>
                  <div className="info-value">
                    {weatherData.wind.gust || weatherData.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}
        
        {/* ChatBot එක වැටෙන්නේ මෙතැනටයි */}
        <div className="floating-chatbot-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;