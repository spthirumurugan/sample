/**
 * Called at startup - creates the baseline notes objects, views, datasets and
 * questions.
 */
import createRunId from 'cdlo_components/notes/helpers/create_run_id';
import { bulkAdd } from '../notes/actions/shell_note_actions';
import tableViewFactory1 from '../notes/schema/hammerbell_table_view_factory';
import tableViewFactory2 from '../notes/schema/pendulum_table_view_factory';
import tableViewFactory3 from '../notes/schema/shuffleboard_table_view_factory';
// import dataFactory from '../notes/schema/data_factory';
import questionFactory from '../notes/schema/question_factory';

export default () => (dispatch) => {
  // Create the runId, dataset and view objects that you want to start with.
  const runId = createRunId();
  const view1 = tableViewFactory1(runId);
  const view2 = tableViewFactory2(runId);
  const view3 = tableViewFactory3(runId);
  // const dataset1 = dataFactory(runId);
  const questionData = questionFactory(runId);

  const bulkData = {
    runId,
    byId: {
      [view1.id]: view1,
      [view2.id]: view2,
      [view3.id]: view3,
      // [dataset1.id]: dataset1,
      // ...questionData.byId
      ...JSON.parse(JSON.stringify(questionData.byId))
    },
    viewIds: [view1.id, view2.id, view3.id],
    datasetIds: [],
    questionIds: [...questionData.questionIds]
  };
  dispatch(bulkAdd(bulkData));
};
