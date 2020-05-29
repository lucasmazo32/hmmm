/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import bookedAtDate from '../api/bookedAtDate';
import '../assets/style/Book.css';

export default function BookTour({
  currentUser, tourId, tourCost, max,
}) {
  const [fetch, setFetch] = useState(false);
  const [canBuy, setCanBuy] = useState(null);
  const [cost, setCost] = useState(0);
  const [message, setMessage] = useState(null);

  const today = new Date();
  const maxDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()).toISOString().slice(0, 10);

  const handleChange = e => {
    setFetch(true);
    const bookedTours = bookedAtDate(tourId, e.target.value);
    bookedTours.then(result => {
      setCanBuy(max - result.booked_tours);
      setFetch(false);
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (new Date(e.target[0].value) <= today || new Date(e.target[0].value) >= maxDate) {
      setMessage('Date must be between tomorrow to 1 year from now.');
    }
    if (e.target[1].value < 1 || e.target[1].value > max) {
      setMessage(`Tickets must be between 1 and ${max}`);
    }
  };

  const handleCost = e => {
    setCost(e.target.value * tourCost);
  };

  const whenData = () => {
    if (canBuy) {
      return (
        <div>
          <label htmlFor="number">
            { `${canBuy} space(s) available.` }
            <input onChange={handleCost} className="form-control" min="1" max={canBuy} id="number" type="number" />
          </label>
          <span>{`Total cost: $${cost} USD`}</span>
          <span className="book-msg">{ message }</span>
          <button className="btn btn-book" type="submit">Book now!</button>
        </div>
      );
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <label htmlFor="date">
        Choose the date:
        <input className="form-control" onChange={handleChange} min={today.toISOString().slice(0, 10)} max={maxDate} id="date" type="date" />
      </label>
      { fetch ? (
        <Loader
          type="Puff"
          color="#1d3557"
          height={50}
          width={50}
        />
      ) : whenData() }
    </form>
  );
}

BookTour.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
  tourId: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  tourCost: PropTypes.string.isRequired,
};

BookTour.defaultProps = {
  currentUser: null,
};
