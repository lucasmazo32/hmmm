import actions from '../actions/index';

const { action } = actions;
const { SET_USER, UNSET_USER } = action;

const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case UNSET_USER:
      return null;
    default:
      return state;
  }
};

export default currentUserReducer;
