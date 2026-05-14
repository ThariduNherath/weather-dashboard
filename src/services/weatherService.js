import axios from 'axios';

const API_KEY = '996569b34a77cf8b22d6eda148d280e5'; // Get from https://openweathermap.org/api
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const WeatherService = {
  async getCurrentWeather(city, unit = 'metric') {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          units: unit,
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('City not found. Please try again.');
    }
  },

  async getForecast(city, unit = 'metric') {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          units: unit,
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch forecast data.');
    }
  },

  async getWeatherByCoords(lat, lon, unit = 'metric') {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          lat,
          lon,
          units: unit,
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch location weather.');
    }
  },
};

// Fallback demo data for development
export const demoWeatherData = {
  name: 'London',
  sys: { country: 'GB' },
  main: {
    temp: 15,
    feels_like: 14,
    humidity: 65,
    pressure: 1015,
    temp_max: 17,
    temp_min: 13
  },
  weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }],
  wind: { speed: 3.6, deg: 250 },
  visibility: 10000,
  dt: Date.now() / 1000
};