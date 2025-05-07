import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PassengerForm({ passenger, setPassenger, onSubmit,selectedSeats, totalfare, bus}) {
  const [errors, setErrors] = useState({});
const navigate=useNavigate()
  // Validate fields
  const validate = (field, value) => {
    let error = '';
    if (!value) {
      error = 'Required';
    } else {
      if (field === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        error = 'Invalid email';
      }
      if (field === 'phone' && !/^\d{10}$/.test(value)) {
        error = 'Invalid phone';
      }
      if (field === 'age' && (value <= 0 || value > 120)) {
        error = 'Invalid age';
      }
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === ''; // return true if valid
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassenger({ ...passenger, [name]: value });
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const fields = ['name', 'age', 'gender', 'email', 'phone'];
    let allValid = true;

    fields.forEach((field) => {
      const valid = validate(field, passenger[field]);
      if (!valid) {
        allValid = false;
      }
    });

    if (allValid) {
      console.log('Form submitted', passenger);
      if (onSubmit) onSubmit(passenger); // trigger parent submit
      navigate("/confirmation",{state:{ selectedSeats:selectedSeats, totalfare:totalfare, bus:bus,passenger:passenger}} )
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div className="mb-3">
        <label className="form-label">Name *</label>
        <input
          type="text"
          name="name"
          value={passenger.name}
          onChange={handleChange}
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      {/* Age */}
      <div className="mb-3">
        <label className="form-label">Age *</label>
        <input
          type="number"
          name="age"
          value={passenger.age}
          onChange={handleChange}
          className={`form-control ${errors.age ? 'is-invalid' : ''}`}
        />
        {errors.age && <div className="invalid-feedback">{errors.age}</div>}
      </div>

      {/* Gender */}
      <div className="mb-3">
        <label className="form-label">Gender *</label>
        <select
          name="gender"
          value={passenger.gender}
          onChange={handleChange}
          className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label">Email *</label>
        <input
          type="email"
          name="email"
          value={passenger.email}
          onChange={handleChange}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      {/* Phone */}
      <div className="mb-3">
        <label className="form-label">Phone *</label>
        <input
          type="tel"
          name="phone"
          value={passenger.phone}
          onChange={handleChange}
          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-100">
        Submit & Continue
      </button>
    </form>
  );
}
