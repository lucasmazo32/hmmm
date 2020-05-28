import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Nav from '../components/Nav';
import selectOptions from '../api/selectOptions';
import '../assets/style/Main.css';

const { clientArray, tourArray } = selectOptions;

export default function Main({ currentUser }) {
  const [clients, setClients] = useState([]);
  const [tours, setTours] = useState([]);

  const clientOptions = () => {
    const response = clientArray();
    response.then(array => {
      setClients(array.clientArr);
    });
  };

  const toursOptions = () => {
    const response = tourArray();
    response.then(array => {
      setTours(array.tourArr);
    });
  };

  useEffect(() => {
    clientOptions();
    toursOptions();
  }, [currentUser]);

  const handleCity = e => {
    console.log(e.target.value);
  };

  const handleTour = e => {
    console.log(e.target.value);
  }

  return (
    <div>
      <Nav currentUser={currentUser} />
      <div className="container-xl main">
        <span className="main-filter-msg">Filter by company or by city!</span>
        <form>
          <select onChange={handleCity} className="form-control" defaultValue="select">
            <option value="select" disabled>Select a company</option>
            { clients.map(client => <option value={client.id} key={client.name}>{client.name}</option>) }
          </select>
          <select onChange={handleTour} className="form-control" defaultValue="select">
            <option value="select" disabled>Select a city</option>
            { tours.map(tour => <option value={tour} key={tour}>{tour}</option>) }
          </select>
        </form>
      </div>
    </div>
  );
}

Main.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
};

Main.defaultProps = {
  currentUser: null,
};
