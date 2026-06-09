import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockFlights } from '../data/mockFlights';

const BookFlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [passengerInfo, setPassengerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const foundFlight = mockFlights.find(f => f.id === parseInt(id));
    setFlight(foundFlight);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    alert(`Booking confirmed for ${passengerInfo.name}! Flight: ${flight.flightNumber}`);
    navigate('/');
  };

  if (!flight) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="book-page">
      <div className="book-container">
        <h1 className="book-title">Book Your Flight</h1>

        <div className="book-card">
          <h2 className="book-section-title">Flight Details</h2>
          <div className="flight-details-box">
            <h3 className="flight-details-airline">{flight.airline} - {flight.flightNumber}</h3>
            <p className="flight-details-route">{flight.from} → {flight.to}</p>
            <p className="flight-details-time">{flight.departureTime} - {flight.arrivalTime}</p>
            <p className="flight-details-price">{flight.price}</p>
          </div>
        </div>

        <form onSubmit={handleBooking} className="book-card">
          <h2 className="book-section-title">Passenger Information</h2>

          <div className="passenger-form">
            <div className="form-field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={passengerInfo.name}
                onChange={handleInputChange}
                className="book-input"
                required
              />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={passengerInfo.email}
                onChange={handleInputChange}
                className="book-input"
                required
              />
            </div>
            <div className="form-field">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={passengerInfo.phone}
                onChange={handleInputChange}
                className="book-input"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="book-button"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookFlight;
