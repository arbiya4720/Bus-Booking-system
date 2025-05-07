import React from 'react';
import { BookingContext } from '../context/BookingContext';
import Confirmation from '../components/Confirmation';
import { useLocation } from 'react-router-dom';

export default function ConfirmationPage() {
  const {state}=useLocation()
  console.log(state)
  return (
    <div className="container mt-5">
      <Confirmation bus={state.bus} totalFare={state.totalfare} passengers={state.passenger} selectedSeats={state.selectedSeats} />
    </div>
  );
}
