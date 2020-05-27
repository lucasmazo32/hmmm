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
import Main from '../components/Main';
import Welcome from '../components/Welcome';
import SignUp from '../components/SignUp';
import '../assets/style/App.css';
import LogIn from '../components/LogIn';

const { getCookie } = session;
const { setUser } = actions;

function App({ currentUser, setUser }) {
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

  console.log(currentUser);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { currentUser ? <Main currentUser={currentUser} /> : <Welcome />}
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <LogIn />
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
