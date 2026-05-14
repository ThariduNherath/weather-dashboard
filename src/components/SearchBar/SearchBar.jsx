import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import '../../styles/SearchBar.css';

const SearchBar = ({ onSearch, onLocationClick, currentCity }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm('');
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
          />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      
      <div className="location-section">
        <button onClick={onLocationClick} className="location-button">
          <MapPin size={18} />
          Use My Location
        </button>
        <span className="current-city">Current: {currentCity}</span>
      </div>
    </div>
  );
};

export default SearchBar;