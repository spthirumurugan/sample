import { createSelector } from 'reselect';
// import { getDataSet } from '../components/table/selectors/get_data_set';
import getDataSetByGame from '../selectors/get_datasets_by_game';

const getProps = (state, props) => props;
const initState = state => state;

export const getSaveState = createSelector(
  [initState, getProps],
  (state, props) => {
    const datasets = getDataSetByGame(state, props);
    const { notes: { byId } } = state;
    let saveClick = false;
    if (datasets.length > 0) {
      const datasetsId = datasets.length - 1;
      if (byId[datasets[datasetsId]].observation) {
        saveClick = false;
      } else {
        saveClick = true;
      }
    }
    return saveClick;
  }
);

export default getSaveState;
