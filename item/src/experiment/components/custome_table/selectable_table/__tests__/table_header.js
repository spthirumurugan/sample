import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import TableHeader, { getHeaderValues } from '../table_header';
import dummyState from '../../__mock__/dummy_state';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('components', () => {
  describe('<TableHeader />', () => {
    it('should render correctly', () => {
      const store = mockStore(dummyState);
      const comp = renderer.create(
        <TableHeader store={store} viewId={'view_1'} />
      ).toJSON();
      expect(comp).toMatchSnapshot();
    });

    it('should get the header values ', () => {
      const mock = {
        schema: {
          props: ['prop1', 'prop2', 'observation'],
          byProp: {
            prop1: { prop: 'prop1', label: 'Energy' },
            prop2: { prop: 'prop2', label: 'Speed' },
            observation: { prop: 'observation', label: 'Observation' }
          },
          selected: ['prop1']
        }
      };
      const actual = getHeaderValues(mock);
      const expected = [
        { checked: true, label: 'Energy', prop: 'prop1' },
        { checked: false, label: 'Speed', prop: 'prop2' },
        { checked: false, label: 'Observation', prop: 'observation' }];
      expect(actual).toEqual(expected);
    });
  });
});
