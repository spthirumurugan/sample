/**
 * You use these actions to update the notes reducer. They are part of the
 * cdlo_components package so that they can be managed globally.
 *
 * To use:
 * import { updateData } from '../redux/actions/notes_actions';
 * This provides a linkage to notes actions in the cdlo components.
 */
import { updateDataset } from './shell_note_actions';

export default (id, observation) => (dispatch) => {
  const data = {
    observation
  };
  dispatch(updateDataset(id, data));
};
