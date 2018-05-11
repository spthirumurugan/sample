import React, { PropTypes } from 'react';
import uniqid from 'uniqid';
import Checkbox from '../checkbox/checkbox';
import rowElemRenderer from '../helper/row_elem_renderer';

export default function SelectableRow(props) {
  return (<tr>
    <td>
      <Checkbox
        id={uniqid(props.id)}
        value={props.id}
        checked={props.checked}
        onChange={props.onCheck}
      />
    </td>
    { props.cells.map(v => <td key={uniqid('checkbox_')}>{rowElemRenderer(v.type, v.value)}</td>) }
  </tr>);
}

SelectableRow.propTypes = {
  uIds: PropTypes.arrayOf(PropTypes.string).isRequired,//eslint-disable-line
  id: PropTypes.string.isRequired,
  cells: PropTypes.arrayOf(PropTypes.object).isRequired,
  checked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func //eslint-disable-line
};
