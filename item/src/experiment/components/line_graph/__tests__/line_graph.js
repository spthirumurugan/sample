import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import dummyState from '../../__mock__/mock_state';
import LineGraph from '../line_graph';
import getGraphableSchema from '../selectors/get_graphable_schema';


const middlewares = [];
const mockStore = configureStore(middlewares);

jest.mock('recharts');
jest.mock('../../selectable_table/selectable_table', () => 'div');

describe('component <LineGraph />', () => {
  describe('<LineGraph />', () => {
    it('should render', () => {
      const store = mockStore(dummyState);
      const comp = renderer.create(
        <LineGraph store={store} viewId={'view_izzfuauf'} />
      ).toJSON();
      expect(comp).toMatchSnapshot();
    });
  });
});

describe('getGraphData selector', () => {
  it('should convert accept a viewId and return a formatted graph data object', () => {
    const expected = [
      {
        prop: 'eValue',
        type: 'number',
        label: 'Energy',
        placeHolder: 'Enter Energy value',
        min: 0,
        max: 10
      },
      {
        prop: 'sValue',
        type: 'number',
        label: 'Speed',
        placeHolder: 'Enter Speed value',
        min: 0,
        max: 10
      }
    ];
    const actual = getGraphableSchema(dummyState.notes, 'view_izzfuauf');
    expect(actual).toEqual(expected);
  });
});
