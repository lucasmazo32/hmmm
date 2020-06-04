import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import actions from '../actions/index';
import logo from '../assets/images/logo.png';
import login from '../api/login';
import session from '../api/session';
import '../assets/style/SignUp.css';

const { setCookie } = session;
const { setUser } = actions;

export function LogIn({ userType, setUser }) {
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    setFetching(true);
    const response = login(email, password, userType === 'user');
    response.then(result => {
      setFetching(false);
      if (result.Message) {
        setMessage(result.Message);
        document.querySelector('.message-alert').classList.remove('closed');
      } else {
        setUser({ type: userType, info: result });
        setCookie(`${userType}${result.id}`);
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
          Password
          <input className="form-control" id="password" type="password" placeholder="Password" />
        </label>
        <button className="btn form-control" type="submit">Submit</button>
      </form>
      <p className="message-alert closed">{message}</p>
      { fetching ? (
        <div className="loader-tour">
          <Loader
            type="Puff"
            color="#1d3557"
            height={50}
            width={50}
          />
        </div>
      ) : null }
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
