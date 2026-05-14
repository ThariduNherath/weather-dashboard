import { useState, useEffect } from 'react';
import { WeatherService, demoWeatherData } from '../services/weatherService';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric');
  const [city, setCity] = useState('London');

  const fetchWeatherData = async (cityName = city, weatherUnit = unit) => {
    setLoading(true);
    setError('');
    
    try {
      // Try real API first
      const [current, forecast] = await Promise.all([
        WeatherService.getCurrentWeather(cityName, weatherUnit),
        WeatherService.getForecast(cityName, weatherUnit)
      ]);
      
      setWeatherData(current);
      setForecastData(forecast);
    } catch (err) {
      console.log('Using demo data due to API error:', err.message);
      // Fallback to demo data
      setWeatherData({ ...demoWeatherData, name: cityName });
      setForecastData(generateDemoForecast());
      setError('Using demo data. Add your API key for real weather data.');
    } finally {
      setLoading(false);
    }
  };

  const generateDemoForecast = () => {
    const forecast = [];
    for (let i = 1; i <= 5; i++) {
      forecast.push({
        dt: Date.now() / 1000 + i * 86400,
        main: { temp: 15 + i, temp_min: 13 + i, temp_max: 18 + i },
        weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }]
      });
    }
    return { list: forecast };
  };

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity, unit);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    fetchWeatherData(city, newUnit);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await WeatherService.getWeatherByCoords(latitude, longitude, unit);
            setWeatherData(data);
            setCity(data.name);
          } catch (err) {
            setError('Failed to get location weather.');
          }
        },
        (error) => {
          setError('Location access denied. Using default city.');
        }
      );
    }
  };

  // Auto-refresh every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (city) {
        fetchWeatherData(city, unit);
      }
    }, 600000);

    return () => clearInterval(interval);
  }, [city, unit]);

  // Initial load
  useEffect(() => {
    fetchWeatherData();
  }, []);

  return {
    weatherData,
    forecastData,
    loading,
    error,
    unit,
    city,
    handleSearch,
    handleUnitChange,
    getCurrentLocation,
    fetchWeatherData
  };
};

