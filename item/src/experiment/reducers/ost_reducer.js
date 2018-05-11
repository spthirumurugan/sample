import { UPDATE_OST } from '../actions/update_ost';

function ostReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case 'ACTION_CONSTANT':
      newState = { ...state };
      break;
    case UPDATE_OST:
      newState = { ...state, ...action.payload };
      break;
    default:
      break;
  }
  return newState;
}
export default ostReducer;
