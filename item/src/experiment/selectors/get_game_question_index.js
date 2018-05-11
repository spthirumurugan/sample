import { createSelector } from 'reselect';

const initState = state => state;

export const getGameQuestionIndex = createSelector(
  [initState],
  (state) => {
    const { byId, questionIds } = state.notes;
    const { selected } = state.experiment.initExperiment;
    let questionIndex;
    let startIndex;
    questionIds.reduce((p, c, i) => {
      if (selected === byId[c].game && startIndex === undefined) {
        startIndex = i;
      }
      if (byId[c].answer === '' && selected === byId[c].game && questionIndex === undefined) {
        questionIndex = i;
      }
      return p;
    }, undefined);
    const questInd = (questionIndex !== undefined) ? questionIndex : -1;
    if (questInd > -1) {
      questionIndex -= startIndex;
    } else {
      questionIndex = questInd;
    }
    return questionIndex;
  }
);

export default getGameQuestionIndex;
