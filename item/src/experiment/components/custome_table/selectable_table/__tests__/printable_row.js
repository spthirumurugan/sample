import React from 'react';
import renderer from 'react-test-renderer';
import PrintableRow from '../printable_row';

describe('components', () => {
  describe('<PrintableRowu />', () => {
    it('should render', () => {
      const row = renderer.create(
        <PrintableRow cells={['prop1', 'prop2']} uIds={['1', '2', '3', '4']} />
      ).toJSON();
      expect(row).toMatchSnapshot();
    });
  });
});
