import { createSelector } from 'reselect';
import { getGameQuestionIndex } from './get_game_question_index';
import { getGameOSTIndex } from './get_game_ost_index';
// import { getDataSet } from '../components/table/selectors/get_data_set';
import getDataSetByGame from './get_datasets_by_game';

const initState = state => state;

export const getPendulumQuestionState = createSelector(
  [initState],
  (state) => {
    let showQuestion = false;
    const { experiment } = state;
    const { tabPopup } = experiment.initExperiment;
    const nextQuesIndex = getGameQuestionIndex(state);
    const pendulumOst = getGameOSTIndex(state);
    let activityActive = 'Phase0';
    switch (nextQuesIndex) {
      case 0: {
        if (pendulumOst === 1) {
          showQuestion = true;
          activityActive = 'Phase4';
        }
        break;
      }
      case 2: {
        // const { note } = state;
        const viewDataSet = getDataSetByGame(state, { type: 'pendulum' });
        if (viewDataSet.length === 1) {
          // const { data: { observation } } = byId[viewDataSet[0]];
          showQuestion = (tabPopup);
          activityActive = 'Phase5';
        }
        break;
      }
      case 4: {
        const { notes: { byId } } = state;
        const viewDataSet = getDataSetByGame(state, { type: 'pendulum' });
        if (viewDataSet.length === 6) {
          const { observation } = byId[viewDataSet[5]];
          showQuestion = (observation !== '' && !tabPopup);
          activityActive = 'Phase6';
        }
        break;
      }
      default:
        break;
    }
    return (showQuestion) ? activityActive : 'Phase0';
  }
);

export default getPendulumQuestionState;
