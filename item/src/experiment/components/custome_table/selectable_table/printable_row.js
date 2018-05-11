import React, { PropTypes } from 'react';
import uniqid from 'uniqid';
import rowElemRenderer from '../helper/row_elem_renderer';

export default function PrintableRow(props) {
  return (<tr>
    { props.cells.map(v => <td key={uniqid('checkbox_')}>{rowElemRenderer(v.type, v.value)}</td>) }
  </tr>);
}

PrintableRow.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.object).isRequired
  // uIds: PropTypes.arrayOf(PropTypes.string).isRequired
};
