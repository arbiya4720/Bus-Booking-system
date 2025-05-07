import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function BusCard({ bus }) {
  const { setSelectedBus } = useContext(BookingContext);
  const navigate = useNavigate();

  const selectBus = () => {
    setSelectedBus(bus);
    navigate('/seats');
  };

  return (
    <div onClick={selectBus} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h4>{bus.busType}</h4>
      <p>Departure: {bus.departureTime}</p>
      <p>Fare: ₹{bus.fareMasters[0].totalAmount}</p>
    </div>
  );
}
