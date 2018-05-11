import mediaViewFactory from 'cdlo_components/notes/schema/media_view_factory';
import addView from 'cdlo_components/notes/actions/add_view';
import getRunId from 'cdlo_components/notes/selectors/get_run_id';

export default src => (dispatch, getState) => {
  const { notes } = getState();
  const runId = getRunId(notes);
  const viewObj = mediaViewFactory(runId, src);
  dispatch(addView(viewObj));
};
