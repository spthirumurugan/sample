import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import getDatasetsByRun from 'cdlo_components/notes/selectors/get_datasets_by_run';
import TableRow from './table_row';

import getDataSetByGame from '../selectors/get_datasets_by_game';

import hammerbellDataSchemaFactory from '../../notes/schema/hammerbell_data_schema_factory';
import pendulumDataSchemaFactory from '../../notes/schema/pendulum_data_schema_factory';
import shuffleboardDataSchemaFactory from '../../notes/schema/shuffleboard_data_schema_factory';

const Table = props => (
  <table className={'table table-bordered'}>
    <thead>
      <tr>
        {
          props.dataSchema.selected.map((val, i) =>
            <th key={`${val}_${(i + 0)}`}>{props.dataSchema.byProp[val].label}</th>
          )
        }
      </tr>
    </thead>
    <tbody>
      {props.datasetIds.map((id, index) =>
        <TableRow
          key={id}
          id={id}
          columns={props.toDisplay}
          isLast={(index === (props.datasetIds.length - 1))}
        />
      )}
    </tbody>
  </table>
);

Table.propTypes = {
  datasetIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataSchema: PropTypes.object.isRequired,
  toDisplay: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  const gameSchemas = {
    hammerBell: hammerbellDataSchemaFactory(),
    pendulum: pendulumDataSchemaFactory(),
    shuffleBoard: shuffleboardDataSchemaFactory()
  };
  const dataSchema = gameSchemas[ownProps.type];
  return {
    datasetIds: getDataSetByGame(state, { type: ownProps.type }),
    toDisplay: dataSchema.selected,
    dataSchema
  };
}

export default connect(mapStateToProps)(Table);
