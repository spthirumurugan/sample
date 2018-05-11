/**
 * You use these actions to update the notes reducer. They are part of the
 * cdlo_components package so that they can be managed globally.
 *
 * To use:
 * import { updateData } from '../redux/actions/notes_actions';
 * This provides a linkage to notes actions in the cdlo components.
 */
import { addView } from './shell_note_actions';

import printTableFactory from '../schema/print_table_factory';

export default viewId => (dispatch, getState) => {
  const { notes } = getState();
  const view = notes.byId[viewId];
  const viewObj = printTableFactory(view);
  dispatch(addView(viewObj));
};
