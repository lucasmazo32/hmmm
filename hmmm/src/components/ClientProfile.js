import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Nav from './Nav';
import clientInfo from '../api/clientInfo';

export default function ClientProfile({ currentUser }) {
  useEffect(() => {
    const response = clientInfo(currentUser.info.id);
  }, []);

  return (
    <div>
      { currentUser ? (
        <section className="user-info container-xl">
          <h2 className="user-info-title">Mi info</h2>
          <img src={currentUser.info.company_logo} alt="company logo" />
          <h2>{ `Company: ${currentUser.info.company_name}` }</h2>
          <h2>{ `Email: ${currentUser.info.email}` }</h2>
        </section>
      ) : null }
    </div>
  );
}

ClientProfile.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
};

ClientProfile.defaultProps = {
  currentUser: null,
};
