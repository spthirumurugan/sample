import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import includes from 'lodash/includes';
import uniqid from 'uniqid';

import updateViewSchemaProp from 'cdlo_components/notes/actions/update_view_schema_prop';
import Checkbox from '../checkbox/checkbox';
import headerElemRenderer from '../helper/header_elem_renderer';


function checkbox(props) {
  return props.headValues.map(v => <th key={uniqid(v.prop)}>
    <Checkbox
      id={uniqid(v.prop)}
      props={v}
      value={v.prop}
      checked={v.checked}
      onChange={() => props.dispatch(updateViewSchemaProp(props.viewId, v.prop))}
    />
  </th>);
}


function label(props) {
  return props.headSelectableValues.map(v => <th key={uniqid(v.prop)}>
    {headerElemRenderer(v.headerType, v.src, v.label)}
  </th>);
}

const TableHeader = props => (
  <thead>
    <tr>
      { props.selectable ? <th /> : null }
      { props.selectable ? checkbox(props) : label(props) }
    </tr>
  </thead>
  );

TableHeader.propTypes = {
  viewId: PropTypes.string, //eslint-disable-line
  selectable: PropTypes.bool,
  headValues: PropTypes.arrayOf(PropTypes.object).isRequired, //eslint-disable-line
  headSelectableValues: PropTypes.arrayOf(PropTypes.object).isRequired //eslint-disable-line
};

export function getSelectableHeaderValues(view) {
  const { selected, byProp } = view.schema;
  return selected.map(prop => ({
    ...byProp[prop]
  }));
}

export function getHeaderValues(view) {
  const { props, selected, byProp } = view.schema;
  return props.map(prop => ({
    ...byProp[prop],
    checked: includes(selected, prop)
  }));
}

function mapStateToProps({ notes }, ownProps) {
  const view = notes.byId[ownProps.viewId];
  const headValues = [...getHeaderValues(view)];
  const headSelectableValues = [...getSelectableHeaderValues(view)];
  return {
    headValues,
    headSelectableValues,
    selectable: view.filter.selectable
  };
}


export default connect(mapStateToProps)(TableHeader);
