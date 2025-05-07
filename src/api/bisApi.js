export const searchBuses = async (from, to, date) => {
    const res = await fetch('https://uat.travl.tech/api/bus/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromCity: from, toCity: to, journeyDate: date })
    });
    const data = await res.json();
    return data.data;
  };
  
  export const fetchSeatMap = async (resp = 1) => {
    const res = await fetch(`https://uat.travl.tech/api/bus/seatmap?resp=${resp}`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data.data.seatLayout;
  };

  export const tempBook  = async (passengers, seats, bus) => {
    const res = await fetch(`https://uat.travl.tech/api/bus/temp-book`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passengers, seats, bus })
    });
    const result = await res.json();
    return result;
  };

  export const makePayment   = async ( tempBookingId, amount) => {
    const res = await fetch(`https://uat.travl.tech/api/bus/payments`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tempBookingId, amount })
    });
    const result = await res.json();
    return result;
  };

  export const confirmBooking    = async ( tempBookingId, paymentId ) => {
    const res = await fetch(`https://uat.travl.tech/api/bus/confirm-book`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tempBookingId, paymentId })
    });
    const result = await res.json();
    return result;
  };
  