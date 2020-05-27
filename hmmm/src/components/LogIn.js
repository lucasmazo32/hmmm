import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  useHistory,
} from 'react-router-dom';
import actions from '../actions/index';
import logo from '../assets/images/logo.png';
import login from '../api/login';
import '../assets/style/SignUp.css';

const { setUser } = actions;

function LogIn({ userType, setUser }) {
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    let response;
    if (userType === 'user') {
      response = login(email, password);
    } else {
      response = login(email, password, true);
    }
    response.then(result => {
      if (result.Message) {
        setMessage(result.Message);
        document.querySelector('.message-alert').classList.toggle('closed');
      } else {
        setUser({ type: userType, info: result });
        history.push('/');
      }
    });
  };

  return (
    <div className="sign-up container-xl">
      <img src={logo} alt="hmmm logo" />
      <form onSubmit={handleSubmit}>
        <h2 className="form">Log In</h2>
        <label className="login-label" htmlFor="email">
          { userType === 'user' ? 'User email' : 'Company email' }
          <input className="form-control" id="email" type="email" placeholder="Email" />
        </label>
        <label className="login-label" htmlFor="password">
          { userType === 'user' ? 'Password' : 'Password' }
          <input className="form-control" id="password" type="password" placeholder="Password" />
        </label>
        <button className="btn form-control" type="submit">Submit</button>
      </form>
      <p className="message-alert closed">{message}</p>
    </div>
  );
}

LogIn.propTypes = {
  userType: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ logInReducer: userType }) => ({
  userType,
});

const mapDispatchToProps = dispatch => ({
  setUser: loggedIn => dispatch(setUser(loggedIn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
