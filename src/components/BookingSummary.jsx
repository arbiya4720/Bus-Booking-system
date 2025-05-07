import React from 'react';

export default function BookingSummary({ selectedSeats, bus,totalfare }) {
  return (
    <div className="card">
      <div className="card-header">Booking Summary</div>
      <div className="card-body">
        <h5 className="card-title">{bus.busType}</h5>
        <p className="card-text">Departure: {bus.departureTime}</p>

        <p className="card-text">
          Seats: {selectedSeats.map((s) => s.seatNumber).join(', ')}
        </p>

        <h5>Total Fare: ₹{totalfare.toFixed(2)}</h5>
      </div>
    </div>
  );
}
