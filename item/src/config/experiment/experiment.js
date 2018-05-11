import { OnScreenText } from './on_screen_text';
import InitExp from './init_experiment';

export default {
  ui: {
    resetPopup: false
  },
  onScreenText: {
    ostContend: OnScreenText,
    screenText: 'Turns an object whose values are action creators, into an object with the same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly.'
  },
  initExperiment: InitExp
};
