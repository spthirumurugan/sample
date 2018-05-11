// /**
//  * Called when refresh button clicked - This function will create new data set for the same view and
//  * same run ID.
//  */
// import datasetUpdate from 'cdlo_components/ui/refresh_button/selector/dataset_update';
//
// import { refreshdataset, updateDataset } from '../../notes/actions/shell_note_actions';
// import dataFactory from '../../notes/schema/data_factory';
// import getRunId from '../../notes/selectors/get_run_id';
//
// export default () => (dispatch, getState) => {
//   // Search for the current RunId and add's the new datasets.
//   const { notes } = getState();
//   const runId = getRunId(notes);
//   const dataset1 = dataFactory(runId);
//   const dataset2 = dataFactory(runId);
//   const dataset3 = dataFactory(runId);
//   const updateDatasets = datasetUpdate(notes, runId);
//
//   const bulkData = {
//     byId: {
//       [dataset1.id]: dataset1,
//       [dataset2.id]: dataset2,
//       [dataset3.id]: dataset3
//     },
//     datasetIds: [dataset1.id, dataset2.id, dataset3.id]
//   };
//
//   updateDatasets.map((value) => {
//     dispatch(updateDataset(value.id, value));
//     return value;
//   });
//   dispatch(refreshdataset(bulkData));
// };
