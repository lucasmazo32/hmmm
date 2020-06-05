/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Nav from '../components/Nav';
import selectOptions from '../api/selectOptions';
import mainTours from '../api/tourInfo';
import actions from '../actions/index';
import '../assets/style/Main.css';

const { startLoading, endLoading } = actions;

const { clientArray, tourArray } = selectOptions;

export function Main({
  currentUser, loading, startLoading, endLoading,
}) {
  const [clients, setClients] = useState([]);
  const [cities, setCities] = useState([]);
  const [tours, setTours] = useState([]);

  const clientOptions = () => {
    const response = clientArray();
    response.then(array => {
      setClients(array.clientArr);
    });
  };

  const citiesOptions = () => {
    const response = tourArray();
    response.then(array => {
      setCities(array.tourArr.sort());
    });
  };

  useEffect(() => {
    clientOptions();
    citiesOptions();
  }, [currentUser]);

  const handleClient = e => {
    startLoading();
    const response = mainTours(null, 'client', e.target.value);
    response.then(toursArray => {
      setTours(toursArray);
      endLoading();
    });
  };

  const handleCity = e => {
    startLoading();
    const response = mainTours(null, 'city', e.target.value);
    response.then(toursArray => {
      setTours(toursArray);
      endLoading();
    });
  };

  return (
    <div>
      <Nav currentUser={currentUser} />
      <div className="container-xl main">
        <span className="main-filter-msg">Filter by company or by city!</span>
        <form>
          <select onChange={handleClient} className="form-control" defaultValue="select">
            <option value="select" disabled>Select a company</option>
            { clients.map(client => <option value={client.id} key={client.name}>{client.name}</option>) }
          </select>
          <select onChange={handleCity} className="form-control" defaultValue="select">
            <option value="select" disabled>Select a city</option>
            { cities.map(city => <option value={city} key={city}>{city}</option>) }
          </select>
        </form>
        <div className="main-tours-container">
          { loading ? (
            <div className="loader-tour">
              <Loader
                type="Puff"
                color="#1d3557"
                height={100}
                width={100}
              />
            </div>
          ) : tours.map(tour => (
            <Link to={`/tours/${tour.id}`} className="tour-container" key={tour.id}>
              <span className="desc">{tour.description}</span>
              <span className="city">{tour.city}</span>
            </Link>
          )) }
        </div>
      </div>
    </div>
  );
}

Main.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
  loading: PropTypes.bool.isRequired,
  startLoading: PropTypes.func.isRequired,
  endLoading: PropTypes.func.isRequired,
};

Main.defaultProps = {
  currentUser: null,
};

const mapStateToProps = ({ loadingReducer: loading }) => ({
  loading,
});


const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  endLoading: () => dispatch(endLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
