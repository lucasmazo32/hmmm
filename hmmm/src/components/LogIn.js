import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/images/logo.png';
import '../assets/style/SignUp.css';

export default function LogIn({ userType }) {
  return (
    <div className="sign-up container-xl">
      <img src={logo} alt="hmmm logo" />
      <form>
        <h2 className="form">Log In</h2>
        <input className="form-control" type="email" placeholder="Email" />
        <input className="form-control" type="password" placeholder="Password" />
        <button className="btn form-control" type="submit">Submit</button>
      </form>
    </div>
  );
}

LogIn.propTypes = {
  userType: PropTypes.string.isRequired,
};
