import React from 'react';
import renderer from 'react-test-renderer';
import SelectableRow from '../selectable_row';

describe('components', () => {
  describe('<SelectableRow />', () => {
    it('should render', () => {
      const row = renderer.create(
        <SelectableRow
          cells={['prop1', 'prop2']}
          uIds={['1', '2', '3', '4']}
          id={'id_1'}
          checked
          onCheck={jest.fn()}
        />
      ).toJSON();
      expect(row).toMatchSnapshot();
    });
  });
});
