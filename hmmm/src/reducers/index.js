import { combineReducers } from 'redux';
import logInReducer from './logIn';
import currentUserReducer from './currentUser';

export default combineReducers({
  logInReducer,
  currentUserReducer,
});
