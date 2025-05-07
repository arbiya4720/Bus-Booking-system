import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Filters from '../components/Filters';
import BusList from '../components/BusList';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BusListPage() {
  const location = useLocation();
  const allBuses = location.state?.buses?.tripDetails || [];

  const [filteredBuses, setFilteredBuses] = useState(allBuses);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [busType, setBusType] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const busesPerPage = 5;

  useEffect(() => {
    applyFilters();
  }, [priceRange, busType, departureTime, allBuses]);

  const applyFilters = () => {
    let buses = [...allBuses];

    buses = buses.filter((bus) => {
      const fare = bus?.fareMasters?.totalAmount || 0;
      const typeMatch = busType ? bus.busType.includes(busType) : true;
      const depMatch = departureTime
        ? getDepCategory(bus.departureTime) === departureTime
        : true;
      return fare >= priceRange[0] && fare <= priceRange[1] && typeMatch && depMatch;
    });

    setFilteredBuses(buses);
    setCurrentPage(1);
  };

  const getDepCategory = (time) => {
    const hour = parseInt(time?.split(':')[0]);
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 21) return 'Evening';
    return 'Night';
  };

  const indexOfLast = currentPage * busesPerPage;
  const indexOfFirst = indexOfLast - busesPerPage;
  const currentBuses = filteredBuses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBuses.length / busesPerPage);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Available Buses</h2>
      <Filters
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        busType={busType}
        setBusType={setBusType}
        departureTime={departureTime}
        setDepartureTime={setDepartureTime}
      />
      <BusList
        buses={currentBuses}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        allBuses={allBuses}
      />
    </div>
  );
}
