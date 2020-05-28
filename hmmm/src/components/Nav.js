import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import session from '../api/session';
import logo from '../assets/images/logo.png';
import '../assets/style/Nav.css';

const { destroyCookie } = session;

export default function Nav({ currentUser }) {
  const [name, setName] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (currentUser === null) {
      history.push('/');
    } else if (currentUser.type === 'user') {
      setName(currentUser.info.name);
    } else {
      setName(currentUser.info.company_name);
    }
  }, [currentUser, history]);

  const handleClick = e => {
    e.target.classList.toggle('closed');
    document.querySelector('.nav-options').classList.toggle('closed');
  };

  const handleLogOut = () => {
    destroyCookie();
    history.push('/');
    window.location.reload();
  };

  return (
    <nav>
      <img src={logo} alt="hmmm logo" />
      <span>We help you decide!</span>
      <div className="options-container">
        <button onClick={handleClick} className="btn btn-down-main closed" type="button">{ `Hello, ${name} ` }</button>
        <ul className="nav-options closed">
          <li><Link className="btn btn-down" to="/">Profile</Link></li>
          <li><button onClick={handleLogOut} type="button" className="btn btn-down">Log out</button></li>
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
