import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import actions from '../actions/index';
import logo from '../assets/images/logo.png';
import login from '../api/login';
import session from '../api/session';
import createUser from '../api/createUser';
import '../assets/style/SignUp.css';

const { setCookie } = session;
const { setUser, startLoading, endLoading } = actions;

export function LogIn({
  userType, setUser, loading, startLoading, endLoading, signUp,
}) {
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    startLoading();
    const response = login(email, password, userType === 'client');
    response.then(result => {
      endLoading();
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

  const handleSignUp = e => {
    e.preventDefault();
    startLoading();
    const user = createUser(
      e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value, e.target[4].value,
    );
    user.then(result => {
      endLoading();
      if (result.message) {
        setMessage(result.message);
        document.querySelector('.message-alert').classList.remove('closed');
      } else {
        setUser({ type: 'user', info: result });
        setCookie(`user${result.id}`);
        history.push('/');
      }
    });
  };

  const renderLogin = (() => (
    <form onSubmit={handleLogin}>
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
  ))();

  const renderSignUp = (() => (
    <form onSubmit={handleSignUp}>
      <h2 className="form">Sign up</h2>
      <input className="form-control" type="text" placeholder="Name" />
      <input className="form-control" type="text" placeholder="Username" />
      <input className="form-control" type="email" placeholder="Email" />
      <input className="form-control" type="password" placeholder="Password" />
      <input className="form-control" type="password" placeholder="Password Confirmation" />
      <button className="btn form-control" type="submit">Submit</button>
    </form>
  ))();

  return (
    <div className="sign-up container-xl">
      <img src={logo} alt="hmmm logo" />
      { signUp ? renderSignUp : renderLogin }
      <p className="message-alert closed">{message}</p>
      { loading ? (
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
  loading: PropTypes.bool.isRequired,
  startLoading: PropTypes.func.isRequired,
  endLoading: PropTypes.func.isRequired,
  signUp: PropTypes.bool,
};

LogIn.defaultProps = {
  signUp: null,
};

const mapStateToProps = ({ logInReducer: userType, loadingReducer: loading }) => ({
  userType,
  loading,
});

const mapDispatchToProps = dispatch => ({
  setUser: loggedIn => dispatch(setUser(loggedIn)),
  startLoading: () => dispatch(startLoading()),
  endLoading: () => dispatch(endLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
