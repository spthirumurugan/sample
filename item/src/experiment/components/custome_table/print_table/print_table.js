import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uniqid from 'uniqid';

import TableRow from './table_row';
import TableHeader from './table_header';
import getTableDatasets from '../../../selectors/get_table_datasets';

const PrintTable = ({ viewId, datasets }) => (
  <table className="table table-bordered">
    <TableHeader viewId={viewId} />
    <tbody>
      { datasets.map(id =>
        <TableRow datasetId={id} viewId={viewId} key={uniqid()} />) }
    </tbody>
  </table>
);

PrintTable.propTypes = {
  viewId: PropTypes.string.isRequired,
  datasets: PropTypes.arrayOf(PropTypes.string).isRequired
};

function mapStateToProps(state, ownProps) {
  const datasets = getTableDatasets(state, ownProps.viewId, ownProps.datasetIds);
  return {
    datasets
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintTable);
