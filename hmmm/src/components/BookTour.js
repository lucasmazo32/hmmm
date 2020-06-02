/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import bookedAtDate from '../api/bookedAtDate';
import bookATour from '../api/bookATour';
import helper from '../helpers/whenData';
import '../assets/style/Book.css';

const { whenData, today, maxDate } = helper;

export default function BookTour({
  currentUser, tourId, tourCost, max,
}) {
  const [fetch, setFetch] = useState(false);
  const [canBuy, setCanBuy] = useState(null);
  const [cost, setCost] = useState(0);
  const [message, setMessage] = useState(null);

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
    } else if (e.target[1].value < 1 || e.target[1].value > max) {
      setMessage(`Tickets must be between 1 and ${max}`);
    } else {
      const response = bookATour(currentUser.info.id, tourId, e.target[0].value, e.target[1].value);
      response.then(result => {
        if (result.message) {
          setMessage(result.message);
        } else {
          setMessage('Tickets succesfully booked!');
        }
      });
    }
  };

  const handleCost = e => {
    setCost(e.target.value * tourCost);
  };

  return (
    <form onSubmit={handleSubmit} className="book-form closed">
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
      ) : whenData(canBuy, handleCost, cost, message) }
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
