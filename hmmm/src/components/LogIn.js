import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../assets/images/logo.png';
import '../assets/style/SignUp.css';

function LogIn({ userType }) {
  return (
    <div className="sign-up container-xl">
      <img src={logo} alt="hmmm logo" />
      <form>
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
    </div>
  );
}

LogIn.propTypes = {
  userType: PropTypes.string.isRequired,
};

const mapStateToProps = ({ logInReducer: userType }) => ({
  userType,
});

export default connect(mapStateToProps)(LogIn);
