import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockFlights } from '../data/mockFlights';

const SearchFlights = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    from: '',
    to: '',
    date: '',
  });

  const [filteredFlights, setFilteredFlights] = useState(mockFlights);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    const filtered = mockFlights.filter(flight => {
      const fromMatch = !searchCriteria.from || flight.from.toLowerCase().includes(searchCriteria.from.toLowerCase());
      const toMatch = !searchCriteria.to || flight.to.toLowerCase().includes(searchCriteria.to.toLowerCase());
      const dateMatch = !searchCriteria.date || flight.date === searchCriteria.date;
      return fromMatch && toMatch && dateMatch;
    });
    setFilteredFlights(filtered);
  };

  const handleClearFilters = () => {
    setSearchCriteria({
      from: '',
      to: '',
      date: '',
    });
    setFilteredFlights(mockFlights);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <h1 className="page-title">Search Flights</h1>

        {/* Search Form */}
        <div className="search-form-card">
          <h2 className="search-form-title">Search Criteria</h2>
          <div className="search-form-grid">
            <div className="form-group">
              <label className="form-label">From</label>
              <input
                type="text"
                name="from"
                value={searchCriteria.from}
                onChange={handleInputChange}
                placeholder="e.g., New York"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">To</label>
              <input
                type="text"
                name="to"
                value={searchCriteria.to}
                onChange={handleInputChange}
                placeholder="e.g., Los Angeles"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                value={searchCriteria.date}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
          </div>
          <div className="button-group">
            <button
              onClick={handleSearch}
              className="btn btn-primary"
            >
              Search
            </button>
            <button
              onClick={handleClearFilters}
              className="btn btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Flights List */}
        <h2 className="results-header">
          Available Flights
          <span className="results-count">{filteredFlights.length} found</span>
        </h2>

        <div className="flights-grid">
          {filteredFlights.map(flight => (
            <div key={flight.id} className="flight-card">
              <div className="flight-card-content">
                <div className="flight-info">
                  <div className="flight-header">
                    <span className="airline-badge">{flight.airline}</span>
                    <h3 className="flight-title">{flight.flightNumber}</h3>
                  </div>
                  <p className="flight-route">{flight.from} → {flight.to}</p>
                  <div className="flight-details">
                    <span className="flight-time">{flight.departureTime} - {flight.arrivalTime}</span>
                    <span className="flight-duration">{flight.duration}</span>
                    <span className="flight-date">{flight.date}</span>
                  </div>
                </div>
                <div className="flight-pricing">
                  <p className="flight-price">{flight.price}</p>
                  <Link
                    to={`/book/${flight.id}`}
                    className="btn-book"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="back-button-container">
          <Link
            to="/"
            className="btn btn-secondary"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchFlights;
