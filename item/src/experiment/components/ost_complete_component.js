import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { completeOstPopup } from '../actions/activity_change';
import { ostData } from '../../config/experiment/ost_data';

class OstCompleteComponent extends Component {
  componentDidMount() {
    const self = this;
    setTimeout(() => {
      self.props.completeOstPopup(false);
    }, 8000);
  }
  render() {
    return (
      <div className="ostContainer">
        <div className="ostContent" dangerouslySetInnerHTML={{ __html: ostData[this.props.selected] }} />
      </div>
    );
  }
}

OstCompleteComponent.propTypes = {
  selected: PropTypes.string
};

function mapStateToProps(state) {
  const { experiment: { initExperiment: { selected } } } = state;
  return {
    selected
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    completeOstPopup
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OstCompleteComponent);
