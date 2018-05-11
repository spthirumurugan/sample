import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from 'cdlo_components/ui/buttons/button';
import Toolbar from 'cdlo_components/ui/buttons/toolbar';
import UpdateViewFilterSelectable from 'cdlo_components/notes/actions/update_view_filter_selectable';
import updateViewRenderer from 'cdlo_components/notes/actions/update_view_renderer';

import TableHeader from './table_header';
import TableRow from './table_row';
import getTableDatasets from '../../../selectors/get_table_datasets';

// function handleOnClick(viewId, dispatch, selectable) {
//   if (!selectable) {
//     dispatch(UpdateViewFilterSelectable(viewId));
//   }
//   return undefined;
// graphBtn(changeRenderer, viewId)
// }


const tableBtn = (changeRenderer, viewId) => (<Button
  onClick={() => { changeRenderer(viewId, 'renderers/table_renderer'); }}
>Table</Button>);

const graphBtn = (changeRenderer, viewId) => (<Button
  onClick={() => { changeRenderer(viewId, 'renderers/graph_renderer'); }}
>Graph It</Button>);

const ToolbarHelper = (viewId, toggleEdit, changeRenderer, renderer) => (
  <Toolbar>
    <Button onClick={() => toggleEdit(viewId)}>Done</Button>
    { renderer === 'renderers/table_renderer' ? graphBtn(changeRenderer, viewId) : tableBtn(changeRenderer, viewId) }
  </Toolbar>
);

const SelectableTable = ({
  viewId,
  datasetIds,
  selectable,
  toggleEdit,
  changeRenderer,
  renderer
}) => (
  <div>
    <table // eslint-disable-line
      className="table table-bordered"
      onClick={!selectable ? () => toggleEdit(viewId) : null}
    >
      <TableHeader viewId={viewId} />
      <tbody>
        { datasetIds.map(v =>
          <TableRow datasetId={v} viewId={viewId} key={v} />) }
      </tbody>
    </table>
    {selectable ? ToolbarHelper(viewId, toggleEdit, changeRenderer, renderer) : null}
  </div>);

SelectableTable.propTypes = {
  viewId: PropTypes.string.isRequired,
  toggleEdit: PropTypes.func,
  changeRenderer: PropTypes.func,
  selectable: PropTypes.bool,
  datasetIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  renderer: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  const { notes } = state;
  const view = notes.byId[ownProps.viewId];
  const datasetIds = getTableDatasets(state, ownProps.viewId, ownProps.datasetIds);
  return {
    selectable: view.filter.selectable,
    renderer: view.renderer,
    datasetIds
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleEdit: UpdateViewFilterSelectable,
  changeRenderer: updateViewRenderer
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(SelectableTable);
