import React, { PropTypes } from 'react';
// import LineGraph from './line_graph';
import BarGraph from './bar_graph';
/**
 * http://recharts.org/#/en-US/examples/PieChartWithPaddingAngle
 * You can use the recharts library or any other library to create your renderers
 * @param recieves a list of datasetIds to display.
 */

const GraphRenderer = props => <BarGraph viewId={props.viewId} />;

GraphRenderer.propTypes = {
  viewId: PropTypes.string.isRequired
};

export const GRAPH_RENDERER = 'renderers/graph_renderer';

export default GraphRenderer;
