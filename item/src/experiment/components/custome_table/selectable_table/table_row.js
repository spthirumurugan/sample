import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import updateViewFilterIds from 'cdlo_components/notes/actions/update_view_filter_id';

import SelectableRow from './selectable_row';
import PrintableRow from './printable_row';
import getCell from '../helper/get_cell';
// import getPrintCell from '../helper/get_print_cell';
import getCellValues from '../helper/get_cell_values';
import isChecked from '../helper/is_checked';

export const TableRow = props => (
  props.selectable
    ?
      <SelectableRow
        uIds={props.uIds}
        id={props.datasetId}
        cells={props.cell}
        checked={props.checked}
        onCheck={() => props.dispatch(updateViewFilterIds(props.viewId, props.datasetId))}
      />
     :
      <PrintableRow
        cells={props.printCell}
        uIds={props.uIds}
      />
  );

TableRow.propTypes = {
  uIds: PropTypes.arrayOf(PropTypes.string).isRequired,//eslint-disable-line
  datasetId: PropTypes.string.isRequired,
  selectable: PropTypes.bool.isRequired,
  viewId: PropTypes.string.isRequired, //eslint-disable-line
  cell: PropTypes.arrayOf(PropTypes.object).isRequired,
  printCell: PropTypes.arrayOf(PropTypes.object).isRequired,
  checked: PropTypes.bool.isRequired,
  dispatch: PropTypes.func //eslint-disable-line
};

function mapStateToProps({ notes }, ownProps) {
  const dataset = notes.byId[ownProps.datasetId];
  const view = notes.byId[ownProps.viewId];
  const cell = getCell(dataset, view);
  const printCell = getCellValues(dataset, view);
  return {
    cell,
    printCell,
    selectable: view.filter.selectable,
    checked: isChecked(view.filter.datasetIds, ownProps.datasetId),
    uIds: view.schema.props
  };
}

export default connect(mapStateToProps)(TableRow);
