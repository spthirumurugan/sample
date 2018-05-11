import React, { PropTypes } from 'react';
import PrintTable from './print_table/print_table';
/**
 * Always to to pass arrays of Ids where possible and then connect dataset objects
 * directly to the components that render them.
 * @param {[type]} props [description]
 *
 */
const PrintTableRenderer = ({ datasetIds, viewId }) => (<div>
  <PrintTable viewId={viewId} datasetIds={datasetIds} />
</div>);

PrintTableRenderer.propTypes = {
  viewId: PropTypes.string.isRequired,
  datasetIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

export const PRINT_TABLE_RENDERER = 'renderers/print_table_renderer';

export default PrintTableRenderer;
