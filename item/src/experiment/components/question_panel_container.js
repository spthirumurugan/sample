import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import QuestionPanel from 'cdlo_components/question_panel/question_panel';
import questionCompleteStatus from '../selectors/question_complete_status';

import { SUBMIT } from '../../config/localize';

export const QuestionPanelContainer = props => (
  <QuestionPanel
    isVisible={props.phaseCompleted !== '' ? true : false}
    isEmptyResponse={false}
    isMultipleScreen={props.activityActive}
    buttonLabel={SUBMIT}
  />
);

QuestionPanelContainer.propTypes = {
  visiblity: PropTypes.bool,
  activityActive: PropTypes.string
};

function mapStateToProps(state) {
  const { experiment: { initExperiment } } = state;
  return {
    activityActive: initExperiment.activityActive,
    phaseCompleted: questionCompleteStatus(state, initExperiment.activityActive)
  };
}

export default connect(mapStateToProps)(QuestionPanelContainer);
