const action = {
  LOG_IN_USER: 'LOG IN USER',
  LOG_IN_CLIENT: 'LOG IN CLIENT',
};

const logInUser = () => ({
  type: action.LOG_IN_USER,
});

const logInClient = () => ({
  type: action.LOG_IN_CLIENT,
});

export default { action, logInClient, logInUser };
