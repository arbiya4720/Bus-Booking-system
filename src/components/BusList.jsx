import React from 'react';
import { Link } from 'react-router-dom';

export default function BusList({ buses, currentPage, totalPages, setCurrentPage }) {
  return (
    <>
      {buses.map((bus, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{bus.busType || 'Bus Operator'}</h5>
            <p className="card-text">
              🕒 Departure: {bus.departureTime} | Fare: ₹{bus?.fareMasters[0]?.totalAmount || 0}
            </p>
            <Link to="/seats" state={{ selectedBus: bus }} className="btn btn-primary">
              Select Seats
            </Link>
          </div>
        </div>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            className="btn btn-outline-primary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary ms-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
