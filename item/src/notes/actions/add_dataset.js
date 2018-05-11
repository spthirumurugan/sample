/**
 * You use these actions to update the notes reducer. They are part of the
 * cdlo_components package so that they can be managed globally.
 *
 * To use:
 * import { updateData } from '../redux/actions/notes_actions';
 * This provides a linkage to notes actions in the cdlo components.
 */
import { addDataset } from './shell_note_actions';

import dataFactory from '../schema/data_factory';
import getRunId from '../selectors/get_run_id';

export default data => (dispatch, getState) => {
  const { notes } = getState();
  const runId = getRunId(notes);
  const dataset = dataFactory(runId, data);
  dispatch(addDataset(dataset));
};
