import { createSelector } from 'reselect';
import getDatasetsByRun from 'cdlo_components/notes/selectors/get_datasets_by_run';
// import getDatasets from './get_datasets';

const getProps = (state, props) => props;
const initState = state => state;

export default createSelector(
  [initState, getProps],
  (state, props) => {
    const { notes } = state;
    const { byId } = notes;
    const datasetIds = getDatasetsByRun(notes);
    return (datasetIds.filter(v => byId[v].gameType === props.type) === undefined) ?
    [] : datasetIds.filter(v => byId[v].gameType === props.type);
  }
);
