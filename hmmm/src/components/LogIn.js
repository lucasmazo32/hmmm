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
import LoginForm from './LoginForm';

const { setCookie } = session;
const { setUser, startLoading, endLoading } = actions;

export function LogIn({
  userType, setUser, loading, startLoading, endLoading, signUp,
}) {
  const [message, setMessage] = useState(null);
  const [msgClass, setMsgClass] = useState('message-alert closed');
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
        setMsgClass('message-alert');
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
        setMsgClass('message-alert');
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
      <LoginForm type={signUp ? 'signup' : 'login'} userType={userType} handleLogin={e => handleLogin(e)} handleSignUp={e => handleSignUp(e)} />
      <p className={msgClass}>{message}</p>
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
