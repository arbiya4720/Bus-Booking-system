import React from 'react';

export default function Filters({ priceRange, setPriceRange, busType, setBusType, departureTime, setDepartureTime }) {
  return (
    <div className="row g-3 mb-4">
      {/* Price Filter */}
      <div className="col-md-4">
        <label>Price Range (₹)</label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="10000"
          step="100"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
        />
        <div>0 - ₹{priceRange[1]}</div>
      </div>

      {/* Type Filter */}
      <div className="col-md-4">
        <label>Bus Type</label>
        <select className="form-select" onChange={(e) => setBusType(e.target.value)}>
          <option value="">All</option>
          <option value="AC">AC</option>
          <option value="Non AC">Non AC</option>
          <option value="Sleeper">Sleeper</option>
          <option value="Seater">Seater</option>
        </select>
      </div>

      {/* Departure Filter */}
      <div className="col-md-4">
        <label>Departure Time</label>
        <select className="form-select" onChange={(e) => setDepartureTime(e.target.value)}>
          <option value="">All</option>
          <option value="Morning">Morning (5AM - 12PM)</option>
          <option value="Afternoon">Afternoon (12PM - 5PM)</option>
          <option value="Evening">Evening (5PM - 9PM)</option>
          <option value="Night">Night (9PM - 5AM)</option>
        </select>
      </div>
    </div>
  );
}
