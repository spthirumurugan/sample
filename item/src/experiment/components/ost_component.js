import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { screenPopup, updateOSTData } from '../actions/activity_change';

class OstComponent extends Component {
  componentDidMount() {
    const self = this;
    setTimeout(() => {
      self.props.screenPopup(false);
      self.props.updateOSTData(self.props.i);
    }, 8000);
  }
  render() {
    return (
      <div className="ostContainer">
        <div className="ostContent" dangerouslySetInnerHTML={{ __html: this.props.ostData[this.props.i].ost }} />
      </div>
    );
  }
}

OstComponent.propTypes = {
  i: PropTypes.number,
    /* eslint-disable */
  ostData: PropTypes.array
};

function mapStateToProps(state) {
  const { experiment } = state;
  const { ostData } = experiment.initExperiment;
  return {
    ostData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    screenPopup,
    updateOSTData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OstComponent);
