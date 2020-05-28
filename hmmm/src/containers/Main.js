import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../components/Nav';

export default function Main({ currentUser }) {
  return (
    <div>
      <Nav currentUser={currentUser} />
      <div className="container-xl">
        <form>
          <select></select>
          <select></select>
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
