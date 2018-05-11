import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import SelectableTable from '../selectable_table';
import dummyState from '../../__mock__/dummy_state';

const middlewares = [];
const mockStore = configureStore(middlewares);

jest.mock('../table_row', () => 'tr');
jest.mock('../table_header', () => 'th');

describe('components', () => {
  describe('<SelectableTable />', () => {
    it('should render', () => {
      const store = mockStore(dummyState);
      const comp = renderer.create(
        <SelectableTable store={store} viewId={'view_1'} datasetIds={['id1', 'id2']} />
      ).toJSON();
      expect(comp).toMatchSnapshot();
    });
  });
});
