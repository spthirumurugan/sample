import { createSelector } from 'reselect';
import { getDataSet } from '../components/table/selectors/get_data_set';

const initState = state => state;

export default createSelector(
  initState, (state) => {
    const { runId } = state.notes;
    const datasets = getDataSet(state, { type: runId[runId.length - 1] });
    return datasets;
  }
);
