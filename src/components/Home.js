import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <div className="flying-airplane">✈️</div>
      <div className="home-content">
        <h1 className="home-title">Welcome to Flight Booking</h1>
        <p className="home-subtitle">Find and book your perfect flight</p>
        <Link
          to="/search"
          className="home-cta-button"
        >
          Search Flights
        </Link>
      </div>
    </div>
  );
};

export default Home;
