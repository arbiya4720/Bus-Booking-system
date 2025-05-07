import { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [passenger, setPassenger] = useState({});
  const [fare, setFare] = useState(0);

  return (
    <BookingContext.Provider value={{ selectedBus, setSelectedBus, seats, setSeats, passenger, setPassenger, fare, setFare }}>
      {children}
    </BookingContext.Provider>
  );
};
