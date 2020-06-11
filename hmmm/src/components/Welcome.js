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
import WelcomeContainer from './WelcomeContainer';

const { logInUser, logInClient } = actions;

export function Welcome({ logInClient, logInUser }) {
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
        <WelcomeContainer type="user" handleUser={() => handleUser()} />
        <WelcomeContainer type="client" handleClient={() => handleClient()} />
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
