import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import session from '../api/session';
import actions from '../actions/index';
import showUser from '../api/showUser';
import MainNode from './Main';
import WelcomeNode from '../components/Welcome';
import '../assets/style/App.css';
import LogInNode from '../components/LogIn';
import Tour from '../components/Tour';
import UserProfile from '../components/UserProfile';
import ClientProfile from '../components/ClientProfile';

const { getCookie } = session;
const { setUser } = actions;

export function App({ currentUser, setUser }) {
  useEffect(() => {
    const info = getCookie();
    if (info !== null) {
      if (/user/.test(info)) {
        const response = showUser('user', info.slice(4));
        response.then(result => {
          setUser({ type: 'user', info: result });
        });
      } else {
        const response = showUser('client', info.slice(6));
        response.then(result => {
          setUser({ type: 'client', info: result });
        });
      }
    }
  }, [setUser]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { currentUser ? <MainNode currentUser={currentUser} /> : <WelcomeNode />}
        </Route>
        <Route path="/signup">
          <LogInNode signUp />
        </Route>
        <Route path="/login">
          <LogInNode />
        </Route>
        <Route path="/tours/:id">
          <Tour currentUser={currentUser} />
        </Route>
        <Route path="/me/:username">
          <UserProfile currentUser={currentUser} />
        </Route>
        <Route path="/client/:id">
          <ClientProfile currentUser={currentUser} />
        </Route>
      </Switch>
    </Router>
  );
}

App.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.any),
  setUser: PropTypes.func.isRequired,
};

App.defaultProps = {
  currentUser: null,
};

const mapStateToProps = ({ currentUserReducer: currentUser }) => ({
  currentUser,
});

const mapDispatchToProps = dispatch => ({
  setUser: userInfo => dispatch(setUser(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
