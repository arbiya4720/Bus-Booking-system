import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BusSearch() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters state
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [busTypeFilter, setBusTypeFilter] = useState('');
  const [departureTimeFilter, setDepartureTimeFilter] = useState('');
  const [page, setPage] = useState(1);

  // Mock location options
  const locations = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"];

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);
    setBuses([]);
    setFilteredBuses([]);
    setPage(1);

    try {
      const response = await fetch('https://uat.travl.tech/api/bus/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromCity: fromLocation,
          toCity: toLocation,
          journeyDate: journeyDate
        })
      });

      const data = await response.json();

      setBuses(data.data.tripDetails || []);
      setFilteredBuses(data.data.tripDetails || []);
    } catch (error) {
      console.error("Error fetching buses:", error);
    } finally {
      setLoading(false);
    }
  };
console.log(filteredBuses);

  const applyFilters = () => {
    const filtered = buses?.filter(bus => {
      const price = bus.fareMasters?.[0]?.totalAmount || 0;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesType = busTypeFilter ? bus.busType.includes(busTypeFilter) : true;

      let depHour = 0;
      try {
        depHour = parseInt(bus.departureTime.split(':')[0]);
      } catch {
        depHour = 0;
      }

      let matchesDeparture = true;
      if (departureTimeFilter === 'Morning') matchesDeparture = depHour >= 5 && depHour < 12;
      else if (departureTimeFilter === 'Afternoon') matchesDeparture = depHour >= 12 && depHour < 17;
      else if (departureTimeFilter === 'Evening') matchesDeparture = depHour >= 17 && depHour < 21;
      else if (departureTimeFilter === 'Night') matchesDeparture = depHour >= 21 || depHour < 5;

      return matchesPrice && matchesType && matchesDeparture;
    });

    setFilteredBuses(filtered);
    setPage(1); // Reset pagination
  };

  useEffect(()=>{},[filteredBuses])

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🚌 Bus Search</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="row g-3">
        {/* From Location */}
        <div className="col-md-4">
          <label className="form-label">From Location</label>
          <input
            list="from-locations"
            className="form-control"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            required
          />
          <datalist id="from-locations">
            {locations.map((loc) => (
              <option key={loc} value={loc} />
            ))}
          </datalist>
        </div>

        {/* To Location */}
        <div className="col-md-4">
          <label className="form-label">To Location</label>
          <input
            list="to-locations"
            className="form-control"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            required
          />
          <datalist id="to-locations">
            {locations.map((loc) => (
              <option key={loc} value={loc} />
            ))}
          </datalist>
        </div>

        {/* Journey Date */}
        <div className="col-md-4">
          <label className="form-label">Journey Date</label>
          <input
            type="date"
            className="form-control"
            value={journeyDate}
            onChange={(e) => setJourneyDate(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Search Buses</button>
        </div>
      </form>

      <hr className="my-4" />

      {/* Filters */}
      {buses?.length > 0 && (
        <>
          <h5>Filters</h5>
          <div className="row g-2 mb-4">
            {/* Price Range */}
            <div className="col-md-4">
              <label>Price Range (₹)</label>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                className="form-range"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                onMouseUp={applyFilters}
              />
              <div>0 - {priceRange[1]}</div>
            </div>

            {/* Bus Type */}
            <div className="col-md-4">
              <label>Bus Type</label>
              <select className="form-select" value={busTypeFilter} onChange={(e) => { setBusTypeFilter(e.target.value); applyFilters(); }}>
                <option value="">All</option>
                <option value="Volvo">Volvo</option>
                <option value="AC">AC</option>
                <option value="Seater">Seater</option>
              </select>
            </div>

            {/* Departure Time */}
            <div className="col-md-4">
              <label>Departure Time</label>
              <select className="form-select" value={departureTimeFilter} onChange={(e) => { setDepartureTimeFilter(e.target.value); applyFilters(); }}>
                <option value="">All</option>
                <option value="Morning">Morning (5AM-12PM)</option>
                <option value="Afternoon">Afternoon (12PM-5PM)</option>
                <option value="Evening">Evening (5PM-9PM)</option>
                <option value="Night">Night (9PM-5AM)</option>
              </select>
            </div>
          </div>
        </>
      )}

      {/* Results */}
      {loading ? (
        <div>
          {[...Array(3)].map((_, i) => (
            <div className="placeholder-glow mb-3" key={i}>
              <span className="placeholder col-12"></span>
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredBuses?.slice(0, page * 5).map((bus, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{bus.operatorName}</h5>
                <p className="card-text">Departure: {bus.departureTime}</p>
                <p className="card-text">Type: {bus.busType}</p>
                <p className="card-text">Price: ₹{bus.fareMasters?.[0]?.totalAmount || 0}</p>
              </div>
            </div>
          ))}

          {/* Load More */}
          {filteredBuses?.length > page * 5 && (
            <div className="text-center mb-4">
              <button className="btn btn-outline-primary" onClick={() => setPage(page + 1)}>
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
