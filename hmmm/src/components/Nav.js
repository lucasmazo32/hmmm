import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/images/logo.png';
import '../assets/style/Nav.css';

export default function Nav({ currentUser }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (currentUser.type === 'user') {
      setName(currentUser.info.name);
    } else {
      setName(currentUser.info.company_name);
    }
  }, [currentUser]);

  const handleClick = () => {
    document.querySelector('.nav-options').classList.toggle('closed');
  };

  return (
    <nav>
      <img src={logo} alt="hmmm logo" />
      <span>We help you decide!</span>
      <div className="options-container">
        <button onClick={handleClick} className="btn btn-down-main" type="button">{ `Hello, ${name} ` }</button>
        <ul className="nav-options closed">
          <li><Link className="btn btn-down" to="/">Profile</Link></li>
          <li><Link className="btn btn-down" to="/">Log out</Link></li>
        </ul>
      </div>
    </nav>
  );
}


Nav.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
};

Nav.defaultProps = {
  currentUser: null,
};
