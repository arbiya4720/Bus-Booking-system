import React, { useEffect, useState } from 'react';
import { fetchSeatMap } from '../api/bisApi';
import SeatMap from '../components/SeatMap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router';

export default function SeatSelectionPage() {
  const navigate=useNavigate()
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalFare, setTotalFare] = useState(0);
  const {state}=useLocation()
  const bus=state.selectedBus
  
  useEffect(() => {
    getSeatData();
  }, []);

  const getSeatData = async () => {
    const data = await fetchSeatMap(1); // Layout 1 for now
    setSeats(data);
  };
console.log(seats)
  const handleSelectSeat = (seat) => {
    const isSelected = selectedSeats.some((s) => s.seatNumber === seat.seatNumber);
    let newSelectedSeats;

    if (isSelected) {
      newSelectedSeats = selectedSeats.filter((s) => s.seatNumber !== seat.seatNumber);
    } else {
      newSelectedSeats = [...selectedSeats, seat];
    }
    setSelectedSeats(newSelectedSeats);

    const total = newSelectedSeats.reduce((sum, s) => sum + s?.fareMaster?.totalAmount, 0);
    setTotalFare(total);
  }
  

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Select Your Seats</h2>
      <SeatMap seats={seats} selectedSeats={selectedSeats} onSelectSeat={handleSelectSeat} />

      <div className="mt-4 p-3 border rounded bg-light">
        <h5>Selected Seats: {selectedSeats.map((s) => s.seatNumber).join(', ') || 'None'}</h5>
        <h5>Total Fare: $ {totalFare}</h5>
      </div>
      <button className="btn btn-outline-success mt-4"  
      disabled={selectedSeats.length === 0 || totalFare === 0} 
      onClick={() => navigate('/passenger', { state: { seats: selectedSeats, fare: totalFare,bus:bus } }) }>
  Proceed to Passenger Details
</button>
    </div>

  );
}
