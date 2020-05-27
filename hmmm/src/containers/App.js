import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Main from '../components/Main';
import Welcome from '../components/Welcome';
import SignUp from '../components/SignUp';
import '../assets/style/App.css';
import LogIn from '../components/LogIn';

function App({ currentUser }) {
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
};

App.defaultProps = {
  currentUser: null,
};

const mapStateToProps = ({ currentUserReducer: currentUser }) => ({
  currentUser,
});

export default connect(mapStateToProps)(App);
