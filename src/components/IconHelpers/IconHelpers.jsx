// src/components/WeatherIcon/WeatherIcon.jsx
import React from 'react';
import { WEATHER_ICONS } from '../../utils/constants';

const WeatherIcon = ({ iconCode, size = 24, className = "", color }) => {
  const IconComponent = WEATHER_ICONS[iconCode] || WEATHER_ICONS['01d'];
  
  return <IconComponent size={size} className={className} color={color} />;
};

export default WeatherIcon;