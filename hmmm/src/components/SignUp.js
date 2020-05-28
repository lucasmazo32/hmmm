import React from 'react';
import logo from '../assets/images/logo.png';
import '../assets/style/SignUp.css';

export default function SignUp() {
  const handleSubmit = e => {

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
    </div>
  );
}
