import { createSelector } from 'reselect';
import { getGameQuestionIndex } from './get_game_question_index';
import { getGameOSTIndex } from './get_game_ost_index';
// import { getDataSet } from '../components/table/selectors/get_data_set';
import getDataSetByGame from './get_datasets_by_game';

const initState = state => state;

export const getShuffuleBoardQuestionState = createSelector(
  [initState],
  (state) => {
    let showQuestion = false;
    const { experiment } = state;
    const { tabPopup } = experiment.initExperiment;
    const nextQuesIndex = getGameQuestionIndex(state);
    const shuffleBoardOst = getGameOSTIndex(state);
    let activityActive = 'Phase0';
    switch (nextQuesIndex) {
      case 0: {
        if (shuffleBoardOst === 1) {
          showQuestion = true;
          activityActive = 'Phase7';
        }
        break;
      }
      case 2: {
        if (shuffleBoardOst === 2) {
          const { notes: { byId } } = state;
          const viewDataSet = getDataSetByGame(state, { type: 'shuffleBoard' });
          if (viewDataSet.length === 1) {
            const { observation } = byId[viewDataSet[0]];
            // please verify the id observation
            showQuestion = (observation !== '' && !tabPopup);
            activityActive = 'Phase8';
          }
          break;
        }
      }
    }
    return (showQuestion) ? activityActive : 'Phase0';
  }
);

export default getShuffuleBoardQuestionState;
