import { createSelector } from 'reselect';
import { getGameQuestionIndex } from './get_game_question_index';
import { getGameOSTIndex } from './get_game_ost_index';
// import { getDataSet } from '../components/table/selectors/get_data_set';
import getDataSetByGame from './get_datasets_by_game';

const initState = state => state;

export const getPendulumOSTState = createSelector(
  [initState],
  (state) => {
    let returnValue = false;
    const pendulumNextOst = getGameOSTIndex(state);
    const quesId = getGameQuestionIndex(state);
    switch (pendulumNextOst) {
      case 0: {
        returnValue = true;
        break;
      }
      case 1: {
        returnValue = (quesId === 2);
        break;
      }
      case 2: {
        const viewDataSet = getDataSetByGame(state, { type: 'pendulum' });
        returnValue = (viewDataSet.length === 1);
        break;
      }
      case 3: {
        returnValue = (quesId === 4);
        break;
      }
      default:
        break;
    }
    return returnValue;
  }
);

export default getPendulumOSTState;
