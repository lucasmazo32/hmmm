import React from 'react';
import {
  Link,
  useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../assets/images/logo.png';
import actions from '../actions/index';
import '../assets/style/Welcome.css';

const { logInUser, logInClient } = actions;

function Welcome({ logInClient, logInUser }) {
  const history = useHistory();

  const handleClient = () => {
    logInClient();
    history.push('/login');
  };

  const handleUser = () => {
    logInUser();
    history.push('/login');
  };

  return (
    <div className="welcome-container container-xl">
      <img src={logo} alt="hmmm logo" />
      <div className="welcome">
        <div className="welcome-user">
          <h2>Are you a user?</h2>
          <i className="fas fa-user">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" /></svg>
          </i>
          <button onClick={handleUser} type="button" className="btn btn-welcome">Log in</button>
        </div>
        <div className="welcome-client">
          <h2>Are you a client?</h2>
          <i className="fas fa-user-tie">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-tie" className="svg-inline--fa fa-user-tie fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" /></svg>
          </i>
          <button onClick={handleClient} type="button" className="btn btn-welcome">Log in</button>
        </div>
      </div>
      <p>
        Not a user?&nbsp;
        <Link to="/signup">Sign up!</Link>
      </p>
    </div>
  );
}

Welcome.propTypes = {
  logInClient: PropTypes.func.isRequired,
  logInUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logInClient: () => dispatch(logInClient()),
  logInUser: () => dispatch(logInUser()),
});

export default connect(null, mapDispatchToProps)(Welcome);
