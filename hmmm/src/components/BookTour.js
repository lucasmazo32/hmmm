/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import bookedAtDate from '../api/bookedInfo';
import bookATour from '../api/bookATour';
import helper from '../helpers/whenData';
import actions from '../actions/index';
import '../assets/style/Book.css';

const { endLoading, startLoading } = actions;
const { whenData, today, maxDate } = helper;

export function BookTour({
  currentUser, tourId, tourCost, max, startLoading, endLoading, loading,
}) {
  const [canBuy, setCanBuy] = useState(null);
  const [cost, setCost] = useState(0);
  const [message, setMessage] = useState(null);

  const handleChange = e => {
    startLoading();
    const bookedTours = bookedAtDate(tourId, e.target.value);
    bookedTours.then(result => {
      setCanBuy(max - result.booked_tours);
      endLoading();
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
        Choose the date (must be between today and one year from now):
        <input className="form-control" onChange={handleChange} min={today.toISOString().slice(0, 10)} max={maxDate} id="date" type="date" />
      </label>
      { loading ? (
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
  loading: PropTypes.bool.isRequired,
  startLoading: PropTypes.func.isRequired,
  endLoading: PropTypes.func.isRequired,
};

BookTour.defaultProps = {
  currentUser: null,
};

const mapStateToProps = ({ loadingReducer: loading }) => ({
  loading,
});

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  endLoading: () => dispatch(endLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookTour);
