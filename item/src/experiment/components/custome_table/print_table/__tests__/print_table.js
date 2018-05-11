import React from 'react';
import renderer from 'react-test-renderer';
import PrintTable from '../print_table';

jest.mock('../table_row', () => 'tr');
jest.mock('../table_header', () => 'thead');

describe('components', () => {
  describe('<PrintTable />', () => {
    it('should render', () => {
      const comp = renderer.create(
        <PrintTable viewId={'view_1'} datasetIds={['d1', 'd2']} />
      ).toJSON();
      expect(comp).toMatchSnapshot();
      // expect(toolbar.props.className).toEqual('className');
    });
  });
});
