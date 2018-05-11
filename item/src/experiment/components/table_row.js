import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import Slider from 'cdlo_components/ui/forms/slider/slider';
import Textarea from 'cdlo_components/ui/forms/textarea/textarea';

// import changeEnergy from '../../notes/actions/change_energy_action';
// import changeSpeed from '../../notes/actions/change_speed_action';
import changeObservation from '../../notes/actions/change_observation_action';

const TableRow = props => (
  <tr>
    {
      props.columns.map((val, i) =>
        <td key={`${val}_${(i + 0)}`}>
          {
            (props.isLast && props.dataset.observationType === 'textarea' && val === 'observation') ?
              <Textarea
                id={props.id}
                value={props.observation}
                maxlength={50}
                placeHolder={'Enter Observation'}
                onChange={e => props.dispatch(changeObservation(props.id, e.target.value))}
              /> : props.dataset[val]
          }
        </td>
      )
    }
  </tr>
);

TableRow.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  dataset: PropTypes.object.isRequired,
  isLast: PropTypes.bool.isRequired,
};

function mapStateToProps({ notes }, ownProps) {
  const dataset = notes.byId[ownProps.id];
  return {
    dataset,
    columns: ownProps.columns,
    isLast: ownProps.isLast
  };
}

export default connect(mapStateToProps)(TableRow);
