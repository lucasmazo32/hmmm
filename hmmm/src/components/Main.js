import React from 'react';
import PropTypes from 'prop-types';

export default function Main({ currentUser }) {
  return (
    <div>
      {`Hello, ${currentUser.info.name}`}
    </div>
  );
}

Main.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
};

Main.defaultProps = {
  currentUser: null,
};
