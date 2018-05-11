// import noteDataStruture from './helper/note_data_structure';
import { playAudio } from 'cdlo_components/audio_component/export';
import { addViews, createRunId } from './note_action';
import dataSetFactory from '../helper/data_set_factory';
import noteSchema from '../reducers/note_schema';

import addDataset from '../../notes/actions/add_dataset';


const hammerAudio = require('../media/videos/bell.mp3');
const pendulumAudio = require('../media/videos/beep.mp3');

const gameAudio = {
  hammer: {
    audio: hammerAudio,
    id: 'hammerAudio'
  },
  pendulum: {
    audio: pendulumAudio,
    id: 'pendulumAudio'
  }
};
export const FORCE_CHANGE = 'forceChange';
export const ACTIVITY_CHANGE = 'activityChange';
export const ACTIVE_SCREEN = 'activeScreen';
export const REFRESH = 'refresh';
// export const REFRESH_CLICK = 'refresh';
export const SAVE_DATA = 'start';
export const OST_POPUP = 'ostPopup';
export const OST_COMPLETE_POPUP = 'ostCompPopup';
export const OST_UPDATE = 'ostPopupUpdate';
export const TABLE_POPUP = 'tablePopup';
export const SHOW_QUESTION_PANEL = 'questionPanelPopup';
export const TOGGLE_HAMMER_ANIMATION = 'setHammerAnimation';
export const STAR_HIT = 'pendulumStarHit';
export const AUDIO_END = 'endAudioAnimation';

export function forceChange(value) {
  return {
    type: FORCE_CHANGE,
    payload: {
      value
    }
  };
}

export function activityChange(value) {
  return {
    type: ACTIVITY_CHANGE,
    payload: {
      value
    }
  };
}

export function activeScreen(value) {
  return (dispatch) => {
    dispatch({
      type: ACTIVE_SCREEN,
      payload: {
        value
      }
    });
  };
}


export function questionPopup(value) {
  return {
    type: SHOW_QUESTION_PANEL,
    payload: {
      value
    }
  };
}
export function screenPopup(value) {
  return {
    type: OST_POPUP,
    payload: {
      value
    }
  };
}

export function updateOSTData(index) {
  return {
    type: OST_UPDATE,
    payload: {
      index
    }
  };
}
export function completeOstPopup(value) {
  return {
    type: OST_COMPLETE_POPUP,
    payload: {
      value
    }
  };
}
export function tablePopup(value) {
  return {
    type: TABLE_POPUP,
    payload: {
      value
    }
  };
}

export function audioStart() {
  return (dispatch, getState) => {
    const state = getState();
    const { experiment: { initExperiment: { selected } } } = state;
    dispatch(playAudio(gameAudio[selected].audio, {}, gameAudio[selected].id));
  };
}

export function start(values) {
  return (dispatch, getState) => {
    const state = getState();
    const dataSet = dataSetFactory(state, values);
    // dispatch(addDataSets([dataSet]));
    dispatch(addDataset(dataSet));
    dispatch(tablePopup(true));
  };
}

export function pendulumStarData(index) {
  return (dispatch) => {
    dispatch({
      type: STAR_HIT,
      payload: {
        index
      }
    });
  };
}

export function toggleHammerAnim(val) {
  return (dispatch) => {
    // if (val) {
    //   dispatch(playAudio(initAudio.brick_fall.src, {}, initAudio.brick_fall.id));
    // }
    dispatch({
      type: TOGGLE_HAMMER_ANIMATION,
      payload: {
        props: { isAnimate: val }
      }
    });
  };
}

export function createViews() {
  return (dispatch) => {
    dispatch(createRunId());
    Object.keys(noteSchema).map((v) => {
      if (v.indexOf('viewSchema') !== -1) {
        const returnval = JSON.parse(JSON.stringify(noteSchema[v]));
        dispatch(addViews(returnval));
      }
      return v;
    });
  };
}

// export function resetActivity() {
//   return (dispatch, getState) => {
//     const state = getState();
//     // const { note: { questionIds } } = state;
//     const { experiment: { selected, screens } } = state;
//     console.log('selected', selected);
//     if (selected === 'hammerBell') {
//       // selected.selected = true;
//       screens[0].force = 0;
//       screens[0].attempts = 5;
//     }
//     if (selected === 'pendulum') {
//       // selected.selected = true;
//       screens[1].force = 0;
//       screens[1].attempts = 6;
//       screens[1].starData = [false, false, false];
//     }
//     if (selected === 'shuffleBoard') {
//       // selected.selected = true;
//       screens[2].force = 0;
//       screens[2].attempts = 3;
//     }
//     // questionIds.map((v) => {
//     //   dispatch(updateAnswer('', v));
//     //   return v;
//     // });
//     // dispatch(createViews());
//   };
// }

export function refresh() {
  return (dispatch) => {
    dispatch({
      type: REFRESH
    });
    // dispatch(resetActivity());
  };
}
// export function createDataset(value) {
//   const dataSet = [{
//     dataSetType: 'data',
//     data: {
//       instrument: value,
//       materialObject1: '',
//       materialObject2: '',
//       materialObject3: ''
//     }
//   }];
//   return dataSet;
// }
//
// export function refresh(value) {
//   return (dispatch, getState) => {
//     const { note } = getState();
//     const { byId } = note;
//     const lastDatasetId = getLastDataSetId(getState());
//     const dataSet = byId[lastDatasetId];
//     const { instrument } = dataSet.data;
//     const data = nextInstrument(getState());
//     const { nexInstrument, prevInstrument } = data;
//     dispatch({
//       type: REFRESH_CLICK
//     });
//     dispatch(addDataSets(createDataset(value)));
//   };
// }
