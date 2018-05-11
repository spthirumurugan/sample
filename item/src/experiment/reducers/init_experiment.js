// import { initState } from './init_experiment';
import { FORCE_CHANGE, REFRESH, ACTIVE_SCREEN, START,
  SAVE_DATA, SHOW_QUESTION_PANEL, OST_UPDATE, ACTIVITY_CHANGE,
  OST_POPUP, TABLE_POPUP, TOGGLE_HAMMER_ANIMATION,
  STAR_HIT, OST_COMPLETE_POPUP, AUDIO_END } from '../actions/activity_change';

// const initStartState = JSON.parse(JSON.stringify(initState));

function screenDataChange(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case FORCE_CHANGE :
      if (newState.selected) {
        newState = { ...state };
        newState.force = Number(action.payload.value);
        newState.suffleRefresh = false;
      }
      break;
    case ACTIVE_SCREEN :
      newState = { ...state, selected: false };
      if (action.payload.value === state.id) {
        newState = { ...state, selected: true };
      }
      break;
    case REFRESH :
      newState = { ...state };
      if (newState.selected !== 'pendulum') {
        newState.force = 0;
        newState.suffleRefresh = true;
      }
      if (newState.selected === 'pendulum') {
        // newState.screens[1].starData[action.payload.index] = false;
        newState.screens[1].force = 10;
        newState.suffleRefresh = true;
      }
      break;
    case SAVE_DATA :
      newState = { ...state };
      if (newState.selected) {
        newState.saveData = [...newState.saveData, action.payload.value];
      }
      break;
    default:
      break;
  }
  return newState;
}

function initExperiment(state = {}, action) {
  let newState = { ...state };
  switch (action.type) {
    case FORCE_CHANGE :
      newState.screens = newState.screens.map(screen => screenDataChange(screen, action));
      newState.suffleRefresh = false;
      break;
    case ACTIVITY_CHANGE :
      newState = { ...state, activityActive: action.payload.value };
      break;
    case ACTIVE_SCREEN :
      newState.screens = newState.screens.map(screen => screenDataChange(screen, action));
      newState.selected = action.payload.value;
      break;
    case START :
      newState = { ...state, value: action.payload.value };
      break;
    case REFRESH :
      newState.screens = newState.screens.map(screen => screenDataChange(screen, action));
      if (newState.selected !== 'pendulum') {
        newState.force = 0;
        newState.suffleRefresh = true;
      }
      if (newState.selected === 'pendulum') {
        // newState.screens[1].starData = [false, false, false];
        newState.screens[1].force = 10;
        newState.suffleRefresh = true;
      }
      break;
    case SAVE_DATA :
      newState.screens = newState.screens.map(screen => screenDataChange(screen));
      break;
    case OST_POPUP:
      newState.ostPopup = action.payload.value;
      break;
    case SHOW_QUESTION_PANEL :
      newState.questionPopup = action.payload.value;
      break;
    case TABLE_POPUP :
      newState.tabPopup = action.payload.value;
      break;
    case OST_UPDATE :
      newState.ostData[action.payload.index].isShown = true;
      break;
    case TOGGLE_HAMMER_ANIMATION :
      newState = {
        ...state
      };
      newState.hammerAnim = { ...newState.hammerAnim, ...action.payload.props };
      break;
    case STAR_HIT :
      newState = {
        ...state
      };
      newState.screens[1].starData[action.payload.index] = true;
      break;
    case OST_COMPLETE_POPUP :
      newState = {
        ...state
      };
      newState.ostCompletePopup = action.payload.value;
      break;
    case AUDIO_END:
      break;
    default:
      break;
  }
  return newState;
}
export default initExperiment;
