import React, { PropTypes } from 'react';

import SelectableTable from './selectable_table/selectable_table';

/**
 * Always to to pass arrays of Ids where possible and then connect dataset objects
 * directly to the components that render them.
 * @param {[type]} props [description]
 *
 * TODO : Move the table into the shell project. d
 */
const TableRenderer = ({ dispatch, datasetIds, viewId }) => (<div>
  <SelectableTable dispatch={dispatch} viewId={viewId} datasetIds={datasetIds} />
</div>);

TableRenderer.propTypes = {
  viewId: PropTypes.string.isRequired,
  datasetIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired
};

export const TABLE_RENDERER = 'renderers/table_renderer';

export default TableRenderer;
