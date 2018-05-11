import { createSelector } from 'reselect';
import { getGameQuestionIndex } from './get_game_question_index';
import { getGameOSTIndex } from './get_game_ost_index';

const initState = state => state;

export const getHammerOSTState = createSelector(
  [initState],
  (state) => {
    let returnValue = false;
    const hammerNextOst = getGameOSTIndex(state);
    const quesId = getGameQuestionIndex(state);
    switch (hammerNextOst) {
      case 0: {
        returnValue = true;
        break;
      }
      case 1: {
        returnValue = (quesId === 2);
        break;
      }
      case 2: {
        returnValue = (quesId === 3);
        break;
      }
      default:
        break;
    }
    return returnValue;
  }
);

export default getHammerOSTState;
