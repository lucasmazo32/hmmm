import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Nav from './Nav';
import tourApi from '../api/tourInfo';
import '../assets/style/Tour.css';
import BookTour from './BookTour';

export default function Tour({ currentUser }) {
  const [tour, setTour] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const response = tourApi(id);
    response.then(info => {
      setTour(info);
    });
  }, [id]);

  const handleClick = () => {
    document.querySelector('.book-form').classList.toggle('closed');
  };

  const showInfo = () => (
    <section className="container-xl tour-info">
      <img src={tour.client.company_logo} alt="company logo" />
      <h2>{ `${tour.client.company_name} invites you to:` }</h2>
      <h3>{ tour.tour.city }</h3>
      <p>{ `Tour description: ${tour.tour.description}` }</p>
      <p>{ `Departure hour: ${tour.tour.hour}:00 *Military time` }</p>
      <p>{ `Duration: ${tour.tour.duration} hour(s)` }</p>
      <p>{ `Cost: $${tour.tour.cost} USD per person.` }</p>
      { currentUser.type === 'user' ? <button onClick={handleClick} type="button" className="btn btn-book" to="/booktour">Book this tour</button> : null }
      { currentUser.type === 'user' ? <BookTour currentUser={currentUser} tourId={id} tourCost={tour.tour.cost} max={tour.tour.max_capacity} /> : null }
    </section>
  );

  return (
    <div>
      <Nav currentUser={currentUser} />
      { tour ? showInfo() : (
        <div className="loader-tour">
          <Loader
            type="Puff"
            color="#1d3557"
            height={200}
            width={200}
          />
        </div>
      ) }
    </div>
  );
}

Tour.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
};

Tour.defaultProps = {
  currentUser: null,
};
