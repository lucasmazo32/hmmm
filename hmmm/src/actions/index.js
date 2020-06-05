const action = {
  LOG_IN_USER: 'LOG IN USER',
  LOG_IN_CLIENT: 'LOG IN CLIENT',
  SET_USER: 'SET USER',
  UNSET_USER: 'SET USER',
  START_LOADING: 'START LOADING',
  END_LOADING: 'END LOADING',
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

const startLoading = () => ({
  type: action.START_LOADING,
});

const endLoading = () => ({
  type: action.END_LOADING,
});

export default {
  action, logInClient, logInUser, unsetUser, setUser, startLoading, endLoading,
};
