import { combineReducers } from 'redux';
import logInReducer from './logIn';
import currentUserReducer from './currentUser';
import loadingReducer from './loading';

export default combineReducers({
  logInReducer,
  currentUserReducer,
  loadingReducer,
});
