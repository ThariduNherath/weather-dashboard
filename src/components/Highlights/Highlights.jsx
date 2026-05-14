import React from 'react';
import { Sun, Moon, Sunrise, Sunset, Gauge, Navigation } from 'lucide-react';
import '../../styles/Highlights.css';

const Highlights = ({ weatherData, unit }) => {
  if (!weatherData) return null;

  const {
    main,
    wind,
    sys,
    visibility
  } = weatherData;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const speedUnit = unit === 'metric' ? 'm/s' : 'mph';

  const highlights = [
    {
      icon: <Gauge />,
      label: 'Pressure',
      value: `${main.pressure} hPa`,
      description: 'Atmospheric pressure'
    },
    {
      icon: <Navigation />,
      label: 'Wind Status',
      value: `${wind.speed} ${speedUnit}`,
      description: `${getWindDirection(wind.deg || 0)} direction`
    },
    {
      icon: <Sunrise />,
      label: 'Sunrise',
      value: formatTime(sys.sunrise),
      description: 'Morning golden hour'
    },
    {
      icon: <Sunset />,
      label: 'Sunset',
      value: formatTime(sys.sunset),
      description: 'Evening golden hour'
    },
    {
      icon: <Sun />,
      label: 'UV Index',
      value: 'Moderate',
      description: 'Use sun protection'
    },
    {
      icon: <Moon />,
      label: 'Visibility',
      value: `${(visibility / 1000).toFixed(1)} km`,
      description: 'Clear visibility'
    }
  ];

  return (
    <div className="highlights">
      {highlights.map((highlight, index) => (
        <div key={index} className="highlight-card">
          <div className="highlight-icon">
            {highlight.icon}
          </div>
          <div className="highlight-content">
            <div className="highlight-value">{highlight.value}</div>
            <div className="highlight-label">{highlight.label}</div>
            <div className="highlight-description">{highlight.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Highlights;