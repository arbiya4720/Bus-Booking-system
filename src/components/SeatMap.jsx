import React from 'react';
export default function SeatMap({ seats, selectedSeats, onSelectSeat }) {
  // Find max row and column for grid sizing
  const maxRow = Math.max(...seats.map((s) => parseInt(s.row)));
  const maxCol = Math.max(...seats.map((s) => parseInt(s.column)));

  return (
    <div
      className="seat-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${maxCol}, 50px)`,
        gap: '10px',
        justifyContent: 'center',
      }}
    >
      {seats.map((seat, index) => {
        // console.log(seat);
        
        const isSelected = selectedSeats.some((s) => s.seatNumber === seat.seatNumber);
        const isBooked = !seat.bookable;
        let seatClass = 'btn btn-sm ';
        if (isBooked) seatClass += 'btn-secondary';
        else if (isSelected) seatClass += 'btn-success';
        else seatClass += 'btn-outline-primary';

        return (
          <button
            key={index}
            className={seatClass}
            style={{ width: 50, height: 50 }}
            disabled={isBooked}
            onClick={() => onSelectSeat(seat)}
            title={`Seat: ${seat.seatNumber}\nPrice: ₹${seat.fareMaster.totalAmount}`}
          >
            {seat.seatNumber}
          </button>
        );
      })}
    </div>
  );
}
