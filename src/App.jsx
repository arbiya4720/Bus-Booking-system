import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import HomePage from './pages/HomePage';
import BusListPage from './pages/BusListPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import PassengerPage from './pages/PassengerPage';
import ConfirmationPage from './pages/ConfirmationPage';
import "./App.css"

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buses" element={<BusListPage />} />
          <Route path="/seats" element={<SeatSelectionPage />} />
          <Route path="/passenger" element={<PassengerPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
      </BrowserRouter>
    </BookingProvider>
  );
}
