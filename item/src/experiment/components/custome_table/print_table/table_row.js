import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';

export const TableRow = props => (<tr>
  { props.cellValues.map((value, i) => <td key={uniqid()}>{value}</td>) }
</tr>);

TableRow.propTypes = {
  uIds: PropTypes.arrayOf(PropTypes.string).isRequired,//eslint-disable-line
  viewId: PropTypes.string.isRequired, //eslint-disable-line
  cellValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func //eslint-disable-line
};

export function getCellValues(dataset, view) {
  const { selected } = view.schema;
  return selected.map(p => (
    String(dataset[p])
  ));
}

function mapStateToProps({ notes }, ownProps) {
  const dataset = notes.byId[ownProps.datasetId];
  const view = notes.byId[ownProps.viewId];
  const cellValues = getCellValues(dataset, view);
  return {
    cellValues,
    uIds: view.schema.props
  };
}

export default connect(mapStateToProps)(TableRow);
