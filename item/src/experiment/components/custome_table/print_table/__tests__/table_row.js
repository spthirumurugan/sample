import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import TableRow, { getCellValues } from '../table_row';
import dummyState from '../../__mock__/dummy_state';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('components TableRow', () => {
  describe('<TableRow />', () => {
    it('should render', () => {
      const store = mockStore(dummyState);
      const comp = renderer.create(
        <TableRow store={store} datasetId={'data_1'} viewId={'view_1'} />
      ).toJSON();
      expect(comp).toMatchSnapshot();
    });
  });
  describe('formatProps func', () => {
    it(`should read the view.filter.props and return an array
      of props from the dataset to display`, () => {
      const { data_1, view_1 } = dummyState.notes.byId;
      const actual = getCellValues(data_1, view_1);
      const expected = ['1'];
      expect(actual).toEqual(expected);
    });
  });
});
