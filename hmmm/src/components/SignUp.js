import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import createUser from '../api/createUser';
import session from '../api/session';
import actions from '../actions/index';
import '../assets/style/SignUp.css';

const { setUser } = actions;

const { setCookie } = session;

function SignUp({ setUser }) {
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    const user = createUser(
      e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value, e.target[4].value,
    );
    user.then(result => {
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

  return (
    <div className="sign-up container-xl">
      <img src={logo} alt="hmmm logo" />
      <form onSubmit={handleSubmit}>
        <h2 className="form">Sign up</h2>
        <input className="form-control" type="text" placeholder="Name" />
        <input className="form-control" type="text" placeholder="Username" />
        <input className="form-control" type="email" placeholder="Email" />
        <input className="form-control" type="password" placeholder="Password" />
        <input className="form-control" type="password" placeholder="Password Confirmation" />
        <button className="btn form-control" type="submit">Submit</button>
      </form>
      <p className="message-alert closed">{message}</p>
    </div>
  );
}

SignUp.propTypes = {
  setUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ logInReducer: userType }) => ({
  userType,
});

const mapDispatchToProps = dispatch => ({
  setUser: loggedIn => dispatch(setUser(loggedIn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
