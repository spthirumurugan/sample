// import { createGraphView } from 'cdlo_components';
// import { getViewId } from '../components/table/selectors/get_view_id';
import getRunId from '../helper/get_run_id';
import createUniqueId from '../helper/create_unique_id';
import createView from '../helper/create_view';
// import { getSelectedQuestionId } from '../components/question_panel/selectors/get_selected_question_id';


export const ADD_VIEWS = 'AddViewsToNote';
export const ADD_QUESTIONS = 'AddQuestionsToNote';
export const ADD_DATASETS = 'AddDatasetsToNote';
export const UPDATE_DATASET = 'UpdateDatasetToNote';
export const UPDATE_INPUT_DATASET = 'UpdateInputDatasetToNote';
export const CREATE_RUN = 'CreateRunId';
export const CREATE_DATASET_ID = 'CreateDataSetId';
export const UPDATE_ANSWER = 'updateAnswer';
export const SUBMIT_ACTION = 'submitAction';

export function createRunId() {
  return {
    type: CREATE_RUN,
    payload: {
      runId: createUniqueId()
    }
  };
}

export function addViews(viewData) {
  return (dispatch, getState) => {
    const { runId } = getState().notes;
    const rId = getRunId(runId);
    const id = createUniqueId();
    const view = createView(viewData, rId, id);
    dispatch({
      type: ADD_VIEWS,
      payload: {
        byId: view,
        viewIds: id
      }
    });
  };
}
// export function generateGraphView(obj) {
//   return (dispatch, getState) => {
//     const state = getState();
//     const { note } = state;
//     const viewId = getViewId(state, obj);
//     const graphView = createGraphView(note.byId[viewId]);
//     dispatch(addViews(graphView));
//   };
// }
export function addDataSets(dataSets) {
  return (dispatch, getState) => {
    const { runId } = getState().notes;
    const rId = getRunId(runId);
    const dataSetId = [];
    const dataSet = dataSets.reduce((p, c) => {
      const cur = c;
      cur.runId = rId;
      cur.id = createUniqueId();
      cur.timeStamp = Date.now();
      dataSetId.push(cur.id);
      p[cur.id] = cur;
      return p;
    }, {});
    dispatch({
      type: ADD_DATASETS,
      payload: {
        byId: dataSet,
        dataSetIds: dataSetId
      }
    });
  };
}

export function updateDataSet(dataSet) {
  return {
    type: UPDATE_DATASET,
    payload: {
      id: dataSet.id,
      byId: dataSet
    }
  };
}

export function updateInputDataSet(dataSetId, dataSetKey, value) {
  const dataSet = {};
  dataSet.data = value;
  return {
    type: UPDATE_INPUT_DATASET,
    payload: {
      id: dataSetId,
      props: dataSet,
      dataSetKey
    }
  };
}

export function addQuestions(questionData) {
  return (dispatch, getState) => {
    const state = getState();
    const runId = state.notes.runId[state.notes.runId.length - 1];
    const questionId = [];
    const question = questionData.reduce((p, c) => {
      const cur = c;
      cur.runId = runId;
      cur.id = createUniqueId();
      p[cur.id] = cur;
      questionId.push(cur.id);
      return p;
    }, {});
    dispatch({
      type: ADD_QUESTIONS,
      payload: {
        byId: question,
        questionIds: questionId
      }
    });
  };
}

export function updateAnswer(value, selectedId) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_ANSWER,
      payload: {
        props: { answer: value },
        id: selectedId
      }
    });
  };
}

// export function submitAction() {
//   return (dispatch, getState) => {
//     const state = getState();
//     const selectedId = getSelectedQuestionId(state);
//     dispatch({
//       type: SUBMIT_ACTION,
//       payload: {
//         // props: { answer: value },
//         id: selectedId
//       }
//     });
//   };
// }
