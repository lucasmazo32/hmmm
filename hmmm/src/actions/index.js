const action = {
  LOG_IN_USER: 'LOG IN USER',
  LOG_IN_CLIENT: 'LOG IN CLIENT',
  SET_USER: 'SET USER',
  UNSET_USER: 'SET USER',
};

const logInUser = () => ({
  type: action.LOG_IN_USER,
});

const logInClient = () => ({
  type: action.LOG_IN_CLIENT,
});

const unsetUser = () => ({
  type: action.UNSET_USER,
});

const setUser = userInfo => ({
  type: action.SET_USER,
  payload: userInfo,
});

export default {
  action, logInClient, logInUser, unsetUser, setUser,
};
