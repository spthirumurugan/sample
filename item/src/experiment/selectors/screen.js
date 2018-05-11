import { createSelector } from 'reselect';

const getState = state => state;

const screenView = ({ experiment }) => {
  const { screens } = experiment.initExperiment;
  let intialScreen = true;
  const viewStatus = {
    intialScreen: false,
    pendulum: false,
    hammerBell: false,
    shuffleBoard: false
  };
  screens.map((value) => {
    viewStatus[value.id] = value.selected;
    if (intialScreen) {
      intialScreen = !(viewStatus[value.id]);
      viewStatus.intialScreen = intialScreen;
    }
    return value;
  });
  return viewStatus;
};
const screen = createSelector(
[getState],
state => screenView(state)
);

export default screen;
