// src/App.jsx
import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { useWeather } from './hooks/useWeather';
import './styles/App.css';

function App() {
  const weather = useWeather();

  return (
    <div className="app">
      <Dashboard {...weather} />
    </div>
  );
}

export default App;