import React from 'react';
import PropTypes from 'prop-types';

export default function LoginForm({
  type, userType, handleLogin, handleSignUp,
}) {
  return (
    <div>
      { type === 'login' ? (
        <form onSubmit={e => handleLogin(e)}>
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
      ) : (
        <form onSubmit={e => handleSignUp(e)}>
          <h2 className="form">Sign up</h2>
          <input className="form-control" type="text" placeholder="Name" />
          <input className="form-control" type="text" placeholder="Username" />
          <input className="form-control" type="email" placeholder="Email" />
          <input className="form-control" type="password" placeholder="Password" />
          <input className="form-control" type="password" placeholder="Password Confirmation" />
          <button className="btn form-control" type="submit">Submit</button>
        </form>
      ) }
    </div>
  );
}

LoginForm.propTypes = {
  type: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
};
