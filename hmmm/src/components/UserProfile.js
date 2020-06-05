import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Nav from './Nav';
import userTours from '../api/bookedInfo';
import '../assets/style/UserProfile.css';

export default function UserProfile({ currentUser }) {
  const { username } = useParams();
  const history = useHistory();
  const [information, setInformation] = useState(null);

  useEffect(() => {
    if (currentUser === null || currentUser.info.username !== username) {
      history.push('/');
    } else {
      const response = userTours(null, null, currentUser.info.id);
      response.then(data => setInformation(data));
    }
  }, [currentUser, history, username]);

  const upcoming = () => information.booked_info.map((tour, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index} className="upcoming-tour">
      <h3>{`Trip to: ${tour.city}`}</h3>
      <h3>{`Date: ${new Date(`${tour.day} 3:00`).toDateString()}`}</h3>
      <h3>{`Time: ${tour.hour}:00 *Military hour`}</h3>
      <h3>{`Duration: ${tour.duration} hour(s)`}</h3>
      <h3>{`Places bought: ${tour.quantity}`}</h3>
      <Link className="btn btn-book" to={`/tours/${tour.tour_id}`}>See tour details</Link>
    </div>
  ));

  return (
    <div>
      <Nav currentUser={currentUser} />
      { currentUser ? (
        <section className="user-info container-xl">
          <h2 className="user-info-title">Mi info</h2>
          <h2>{ `Name: ${currentUser.info.name}` }</h2>
          <h2>{ `Username: ${currentUser.info.username}` }</h2>
          <h2>{ `Email: ${currentUser.info.email}` }</h2>
        </section>
      ) : null }
      { information ? (
        <div className="user-tours container-xl">
          <h3 className="user-tour-title">{ `Different tours booked: ${information.dif_booked}` }</h3>
          <h3 className="user-tour-title last">{ `Total tours booked: ${information.booked_tours}` }</h3>
          <h2>Upcoming tours</h2>
          { upcoming() }
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

UserProfile.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
};

UserProfile.defaultProps = {
  currentUser: null,
};
