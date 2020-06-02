import actions from '../actions/index';

const { action } = actions;
const { LOG_IN_CLIENT, LOG_IN_USER } = action;

const logInReducer = (state = 'user', action) => {
  switch (action.type) {
    case LOG_IN_CLIENT:
      return 'client';
    case LOG_IN_USER:
      return 'user';
    default:
      return state;
  }
};

export default logInReducer;
