import React, { PropTypes } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
/**
 * http://recharts.org/#/en-US/examples/PieChartWithPaddingAngle
 * You can use the recharts library or any other library to create your renderers
 * @param recieves a list of datasetIds to display.
 */

const Graph = props => (
  <ResponsiveContainer width="100%" aspect={4.0 / 1}>
    <LineChart
      width={800} height={300} data={props.datasets}
      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
    >
      <XAxis />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Energy" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="Speed" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
  );

Graph.propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps({ notes }, ownProps) {
  return {
    datasets: ownProps.datasetIds.reduce((p, c) => {
      const dataset = notes.byId[c];
      return [...p, {
        Energy: dataset.eValue,
        Speed: dataset.sValue
      }];
    }, [])
  };
}

export default connect(mapStateToProps)(Graph);
