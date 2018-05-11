import React, { PropTypes } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import filterDatasets from 'cdlo_components/notes/selectors/filter_datasets';
import updateViewFilterSelectable from 'cdlo_components/notes/actions/update_view_filter_selectable';
import getGraphableSchema from './selectors/get_graphable_schema';
import SelectableTable from '../custome_table/selectable_table/selectable_table';

import getTableDatasets from '../../selectors/get_table_datasets';
// import filterDatasets from '../selectors/filter_datasets';
// import updateViewFilterSelectable from '../../notes/actions/update_view_filter_selectable';


const LineGraph = (props) => {
  if (props.selectable) {
    return (<SelectableTable viewId={props.viewId} datasetIds={props.datasetIds} />);
  }
  return (
    <div onClick={() => props.updateViewFilterSelectable(props.viewId)}>
      <ResponsiveContainer
        width="100%" aspect={4.0 / 1}
      >
        <LineChart
          width={800} height={300} data={props.datasets}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <XAxis />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Legend />
          { props.schema.map(sch =>
            <Line
              key={sch.prop}
              type="monotone" dataKey={sch.prop} stroke="#8884d8"
            />) }
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

LineGraph.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateViewFilterSelectable: PropTypes.func.isRequired, // eslint-disable-line
  datasets: PropTypes.arrayOf(PropTypes.object).isRequired,
  datasetIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectable: PropTypes.bool,
  viewId: PropTypes.string.isRequired // Own props
};

export const GRAPH_RENDERER = 'renderers/graph_renderer';

function mapStateToProps(state, ownProps) {
  const view = state.notes.byId[ownProps.viewId];
  const datasets = view.filter.datasetIds.map(id => state.notes.byId[id]);
  const selectable = view.filter.selectable;
  const runDatasetIds = filterDatasets(state, ownProps.viewId);
  const datasetIds = getTableDatasets(state, ownProps.viewId, runDatasetIds);
  const schema = getGraphableSchema(state.notes, ownProps.viewId);
  return {
    schema,
    datasets,
    // datasetIds: runDatasetIds,
    datasetIds,
    selectable
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewFilterSelectable
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LineGraph);
