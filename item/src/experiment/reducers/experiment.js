import { combineReducers } from 'redux';
import ui from './ui_reducer';
import onScreenText from './ost_reducer';
import initExperiment from './init_experiment';

export default combineReducers({
  ui,
  onScreenText,
  initExperiment
});
