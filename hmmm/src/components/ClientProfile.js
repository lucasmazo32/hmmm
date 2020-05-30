import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Nav from './Nav';
import clientInfo from '../api/clientInfo';

export default function ClientProfile({ currentUser }) {
  const { id } = useParams();

  const [information, setInformation] = useState(null);

  useEffect(() => {
    const response = clientInfo(id);
    response.then(array => {
      setInformation(array);
    });
  }, [id]);

  const handleRender = () => information[0].map(tour => (
    <div className="upcoming-tour" key={tour.id}>
      <h3>{ `City: ${tour.city}` }</h3>
      <h3>{ `Cost: $${tour.cost} USD` }</h3>
      <h3>{ `Spaces booked: ${information[1][tour.id]}` }</h3>
      <Link className="btn btn-book" to={`/tours/${tour.id}`}>See tour details</Link>
    </div>
  ));

  return (
    <div>
      <Nav currentUser={currentUser} />
      { currentUser ? (
        <section className="user-info container-xl">
          <h2 className="user-info-title">Mi info</h2>
          <img src={currentUser.info.company_logo} alt="company logo" />
          <h2>{ `Company: ${currentUser.info.company_name}` }</h2>
          <h2>{ `Email: ${currentUser.info.email}` }</h2>
        </section>
      ) : null }
      { information ? (
        <div className="user-tours container-xl">
          <h3 className="user-tour-title">{ `Company tours: ${information[0].length}` }</h3>
          <h2>Tours information</h2>
          { handleRender() }
        </div>
      ) : (
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

ClientProfile.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
};

ClientProfile.defaultProps = {
  currentUser: null,
};
