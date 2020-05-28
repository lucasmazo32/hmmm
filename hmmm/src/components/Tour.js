import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import Nav from './Nav';
import tourApi from '../api/tourInfo';
import '../assets/style/Tour.css';

export default function Tour({ currentUser }) {
  const [tour, setTour] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const response = tourApi(id);
    response.then(info => {
      setTour(info);
    });
  }, [id]);

  const showInfo = () => (
    <section className="container-xl tour-info">
      <img src={tour.client.company_logo} alt="company logo" />
      <h2>{ `${tour.client.company_name} invites you to:` }</h2>
      <h3>{ tour.tour.city }</h3>
      <p>{ tour.tour.description }</p>
      <p>{ `Departure hour: ${tour.tour.hour}:00 *Military time` }</p>
      <p>{ `Duration: ${tour.tour.duration} hour(s)` }</p>
      <p>{ `Cost: $${tour.tour.cost} USD per person.` }</p>
      { currentUser.type === 'user' ? <Link className="btn btn-book" to="/booktour">Book this tour</Link> : null }
    </section>
  );

  return (
    <div>
      <Nav currentUser={currentUser} />
      { tour ? showInfo() : null }
    </div>
  );
}

Tour.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
};

Tour.defaultProps = {
  currentUser: null,
};
