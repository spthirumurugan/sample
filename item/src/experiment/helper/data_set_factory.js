import noteSchema from '../reducers/note_schema';
import hammerData from '../../config/experiment/hammer_data';
import shuffleboardData from '../../config/experiment/shuffleboard_data';
// import { getDataSet } from '../components/table/selectors/get_data_set';
import getDataSetByGame from '../selectors/get_datasets_by_game';

export default function dataSetFactory(state, values) {
  const { experiment } = state;
  const { screens, selected } = experiment.initExperiment;
  const { dataSchema1, dataSchema2, dataSchema3 } = noteSchema;
  let returnValue;
  // const { noteSchema: { dataSchema1, dataSchema2 } } = note;
  if (selected === 'hammerBell') {
    const { force } = screens[0];
    const bellHeight = hammerData[force].height;
    returnValue = JSON.parse(JSON.stringify(dataSchema1));
    // const { data } = returnValue;
    // data.force.data = force;
    // data.height.data = bellHeight;
    // data.observation.data = '';
    returnValue.force = force;
    returnValue.height = bellHeight;
    returnValue.observation = '';
  } else if (selected === 'pendulum') {
    returnValue = JSON.parse(JSON.stringify(dataSchema2));
    const viewDataSet = getDataSetByGame(state, { type: 'pendulum' });
    // const { data } = returnValue;
    // data.attempt.data = viewDataSet.length + 1;
    // data.height.data = values.height;
    // data.speed.data = 0;
    // data.speed_10L.data = values.speed_10L;
    // data.speed_0B.data = values.speed_0B;
    // data.speed_10R.data = values.speed_10R;
    // data.speed_TR.data = 0;
    // data.observation.data = '';
    returnValue.attempt = viewDataSet.length + 1;
    returnValue.height = values.height;
    returnValue.speed = 0;
    returnValue.speed_10L = values.speed_10L;
    returnValue.speed_0B = values.speed_0B;
    returnValue.speed_10R = values.speed_10R;
    returnValue.speed_TR = 0;
    returnValue.observation = '';
  } else if (selected === 'shuffleBoard') {
    returnValue = JSON.parse(JSON.stringify(dataSchema3));
    // const { data } = returnValue;
    const { force } = screens[2];
    // data.force.data = values.force;
    // data.direction_F.data = values.dirOfForce;
    // data.distance.data = shuffleboardData[force].distance;
    // data.direction_M.data = values.dirOfMotion;
    // data.observation.data = '';
    returnValue.force = values.force;
    returnValue.direction_F = values.dirOfForce;
    returnValue.distance = shuffleboardData[force].distance;
    returnValue.direction_M = values.dirOfMotion;
    returnValue.observation = '';
  }
  return returnValue;
}
