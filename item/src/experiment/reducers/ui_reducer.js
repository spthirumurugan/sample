import { RESET_POPUP_OPEN, RESET_POPUP_CLOSE } from 'cdlo_components/ui/reset/actions/reset_actions';

function uiReducer(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case 'ACTION_CONSTANT':
      newState = { ...state };
      break;
    case RESET_POPUP_OPEN:
      newState = { ...state, resetPopup: true };
      break;
    case RESET_POPUP_CLOSE:
      newState = { ...state, resetPopup: false };
      break;
    default:
      break;
  }
  return newState;
}
export default uiReducer;
