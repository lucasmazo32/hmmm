import actions from '../actions/index';

const { action } = actions;
const { START_LOADING, END_LOADING } = action;

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case END_LOADING:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
