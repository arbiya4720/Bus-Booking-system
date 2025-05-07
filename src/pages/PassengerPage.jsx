import React, { useState } from 'react';
import PassengerForm from '../components/PassengerForm';
import BookingSummary from '../components/BookingSummary';
import { useLocation } from 'react-router';

export default function PassengerPage() {
  const {state}= useLocation()
  const [passenger, setPassenger] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: ''
  });

  return (
    <div className="container my-4">
      <h3>🧍 Enter Passenger Details</h3>

      <div className="row">
        <div className="col-md-6">
          <PassengerForm passenger={passenger} setPassenger={setPassenger} selectedSeats={state.seats} totalfare={state.fare} bus={state.bus} />
        </div>

        <div className="col-md-6">
          <BookingSummary selectedSeats={state.seats} totalfare={state.fare} bus={state.bus} />
        </div>
      </div>
    </div>
  );
}
