import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SearchPage() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const locations = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad"];
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://uat.travl.tech/api/bus/search', {
        fromCity,
        toCity,
        travelDate: date,
      });
      navigate('/buses', { state: { buses: response.data.data } });
    } catch (error) {
      alert('Error fetching buses');
    }
    setLoading(false);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center"> 🚌 Search Your Bus</h2>

      <div className="row g-3 justify-content-center">
        {/* From Location */}
        <div className="col-md-3">
          <label className="form-label">From Location</label>
          <input
            list="from-locations"
            className="form-control"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            required
          />
          <datalist id="from-locations">
            {locations.map((loc) => (
              <option key={loc} value={loc} />
            ))}
          </datalist>
        </div>

        {/* To Location */}
        <div className="col-md-3">
          <label className="form-label">To Location</label>
          <input
            list="to-locations"
            className="form-control"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            required
          />
          <datalist id="to-locations">
            {locations.map((loc) => (
              <option key={loc} value={loc} />
            ))}
          </datalist>
        </div>
        <div className="col-md-3">
        <label className="form-label">Journey Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="col-md-2 d-grid">
          <div className='mt-4'>
          <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status"></div>
            ) : (
              'Search'
            )}
          </button>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="mt-5 text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Fetching available buses...</p>
        </div>
      )}
    </div>
  );
}
