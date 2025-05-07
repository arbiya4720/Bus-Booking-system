import React, { useEffect, useState } from 'react';
import { tempBook, makePayment, confirmBooking } from '../api/bisApi';
import Swal from 'sweetalert2';

export default function Confirmation({ passengers, selectedSeats, bus,totalFare }) {
  const [status, setStatus] = useState('loading');
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);
  const [reference, setReference] = useState('');

  useEffect(() => {
    const book = async () => {
      try {
        // STEP 1: TEMP BOOKING
        const tempRes = await tempBook({ passengers, seats: selectedSeats, bus: bus });
        const tempId = tempRes.data.orderRefNo;

        // STEP 2: PAYMENT
        const paymentRes = await makePayment({ tempBookingId: tempId, amount: totalFare });
        const paymentId = paymentRes.data.paymentId;

        // STEP 3: FINAL CONFIRMATION
        const confirmRes = await confirmBooking({ tempBookingId: tempId, paymentId });
        const finalRef = confirmRes.data.bookingRefNo || `TXN${Date.now()}`;
        console.log(confirmRes);
        setReference(finalRef);
        setBookingData(confirmRes.data);
        setStatus('success');
      } catch (err) {
        console.error(err);
        setStatus('error');
        setError('Booking failed. Please try again.');
      }
    };

    book();
  }, [passengers, selectedSeats, bus]);

  if (status === 'loading') {
    return (
      <div className="text-center my-5">
      
        <p className="mt-2">Booking your seats...</p>
      </div>
    );
  }

  if (status === 'error') {
    return <div className="alert alert-danger">{error}</div>;
  }

const handle=()=>{
  alert("Your booking is confirmed successfully")
  // Swal({title:"Booking Confirmed", text:"Your booking is confirmed", icon:"success" })
}

  return (
    <div className="container my-5">
      <div className="alert alert-success text-center">
        <h3 className="mb-2">🎉 Booking Confirmed!</h3>
        <p>Reference Number: <strong>{reference}</strong></p>
      </div>

      <div className="card mb-4 shadow">
        <div className="card-header fw-bold">Passengers Info</div>
        <div className="card-body">
          <p>Name: {passengers.name}</p>
          <p>Age: {passengers.age}</p>
          <p>Gender: {passengers.gender}</p>
          <p>Email: {passengers.email}</p>
          <p>Phone: {passengers.phone}</p>
        </div>
      </div>

      <div className="card mb-4 shadow">
        <div className="card-header fw-bold">Seat & Fare Details</div>
        <div className="card-body">
          <p>Selected Seats: {selectedSeats.map(seat => seat.seatNumber).join(', ')}</p>
          <p>Fare per seat: ₹{bus.fareMasters[0].totalAmount}</p>
          <p>Total Fare: ₹{totalFare}</p>
        </div>
      </div>

      <div className="text-center mt-4">
        <span onClick={handle} className="badge bg-success p-3 fs-6">✅ Booking Complete</span>
      </div>
    </div>
  );
}
