import React from 'react';
import '../../styles/UnitToggle.css';

const UnitToggle = ({ unit, onUnitChange }) => {
  return (
    <div className="unit-toggle">
      <span className="toggle-label">Units:</span>
      <div className="toggle-buttons">
        <button
          className={`toggle-btn ${unit === 'metric' ? 'active' : ''}`}
          onClick={() => onUnitChange('metric')}
        >
          °C
        </button>
        <button
          className={`toggle-btn ${unit === 'imperial' ? 'active' : ''}`}
          onClick={() => onUnitChange('imperial')}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default UnitToggle;