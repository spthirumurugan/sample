import React, { PropTypes } from 'react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import filterDatasets from 'cdlo_components/notes/selectors/filter_datasets';
import updateViewFilterSelectable from 'cdlo_components/notes/actions/update_view_filter_selectable';
import getGraphableSchema from './selectors/get_graphable_schema';
import SelectableTable from '../custome_table/selectable_table/selectable_table';

import getTableDatasets from '../../selectors/get_table_datasets';
import updateDatasets from './helper/update_datasets';

const BarGraph = (props) => {
  if (props.selectable) {
    return (<SelectableTable viewId={props.viewId} datasetIds={props.datasetIds} />);
  }
  return (
    <div onClick={() => props.updateViewFilterSelectable(props.viewId)}>
      <ResponsiveContainer aspect={2}>
        <BarChart
          width={600} height={700} data={props.datasets}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          animationDuration={0}
        >
          <XAxis />
          <YAxis />
          <Legend verticalAlign="bottom" layout="horizontal" />
          <Tooltip />
          <CartesianGrid vertical={false} />
          {
            props.schema.map(sch => (
              <Bar
                key={sch.prop}
                name={sch.label}
                fill={sch.color}
                type="monotone" dataKey={sch.prop}
              />
            ))
          }
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

BarGraph.propTypes = {
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
  // datasets = updateDatasets(datasets);
  const selectable = view.filter.selectable;
  const runDatasetIds = filterDatasets(state, ownProps.viewId);
  const datasetIds = getTableDatasets(state, ownProps.viewId, runDatasetIds);
  const schema = getGraphableSchema(state.notes, ownProps.viewId);
  return {
    schema,
    datasets,
    datasetIds,
    selectable
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateViewFilterSelectable
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BarGraph);
