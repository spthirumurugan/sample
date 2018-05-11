import { createSelector } from 'reselect';

const initState = state => state;


const getSelectedGameQues = createSelector(
  [initState],
  (state) => {
    const { selected, ostData } = state.experiment.initExperiment;
    let test = -1;
    ostData.reduce((p, c, i) => {
      if (c.game === selected && !c.isShown && test === -1) {
        test = i;
      }
      return p;
    }, []);
    return test;
  }
);

export default getSelectedGameQues;
