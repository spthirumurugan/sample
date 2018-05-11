import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';

import headerElemRenderer from '../helper/header_elem_renderer';

const TableHeader = props => (
  <thead>
    <tr>
      {props.headValues.map(v => <th key={uniqid()}>
        {headerElemRenderer(v.headerType, v.src, v.label)}
      </th>)}
    </tr>
  </thead>
);

TableHeader.propTypes = {
  viewId: PropTypes.string.isRequired, //eslint-disable-line
  headValues: PropTypes.arrayOf(PropTypes.object).isRequired
};

export function getHeaderValues(view) {
  const { selected, byProp } = view.schema;
  return selected.map(prop => ({
    ...byProp[prop]
  }));
}

function mapStateToProps({ notes }, ownProps) {
  const view = notes.byId[ownProps.viewId];
  const headValues = getHeaderValues(view);
  return {
    headValues
  };
}

export default connect(mapStateToProps)(TableHeader);
