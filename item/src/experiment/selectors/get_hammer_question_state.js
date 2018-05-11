import { createSelector } from 'reselect';
import { getGameQuestionIndex } from './get_game_question_index';
import { getGameOSTIndex } from './get_game_ost_index';
// import { getDataSet } from '../components/table/selectors/get_data_set';
import getDataSetByGame from './get_datasets_by_game';

const initState = state => state;

export const getHammerQuestionState = createSelector(
  [initState],
  (state) => {
    let showQuestion = false;
    const { experiment } = state;
    const { tabPopup } = experiment.initExperiment;
    const nextQuesIndex = getGameQuestionIndex(state);
    const hammerOst = getGameOSTIndex(state);
    let activityActive = 'Phase0';
    switch (nextQuesIndex) {
      case 0: {
        if (hammerOst === 1) {
          showQuestion = true;
          activityActive = 'Phase1';
        }
        break;
      }
      case 2: {
        if (hammerOst === 2) {
          const { notes: { byId } } = state;
          const viewDataSet = getDataSetByGame(state, { type: 'hammerBell' });
          if (viewDataSet.length) {
            const { observation } = byId[viewDataSet[0]];
            showQuestion = (observation !== '' && !tabPopup);
            activityActive = 'Phase2';
          }
        }
        break;
      }
      case 3: {
        const { notes: { byId } } = state;
        const viewDataSet = getDataSetByGame(state, { type: 'hammerBell' });
        if (viewDataSet.length === 5) {
          const { observation } = byId[viewDataSet[4]];
          showQuestion = (observation !== '' && !tabPopup);
          activityActive = 'Phase3';
        }
        break;
      }
      default:
        break;
    }
    return (showQuestion) ? activityActive : 'Phase0';
  }
);

export default getHammerQuestionState;
