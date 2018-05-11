/**
 * This is a simple container for the experiment area. Its job is to combine the
 * various part of the experiment.
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getDatasetsByRun from 'cdlo_components/notes/selectors/get_datasets_by_run';
import Reset from 'cdlo_components/ui/reset/component/reset';
// import QuestionPanel from 'cdlo_components/question_panel/question_panel';
import startupAction from '../../startup/startup_action';

import InitExperiment from './init_experiment';

// import { SUBMIT } from '../../config/localize';

export const Experiment = props => (
  <div>
    <Reset onClickReset={props.startupAction} />
    <div className={'col-md-12'}>
      {/* <QuestionPanel
        isVisible
        isEmptyResponse={false}
        isMultipleScreen={'Phase1'}
        buttonLabel={SUBMIT}
      /> */}
    </div>
    <InitExperiment />
  </div>
);

Experiment.propTypes = {
  startupAction: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { experiment, notes, metadata } = state;
  const { screenText } = experiment.onScreenText;
  const { grade } = metadata;
  return {
    datasetIds: getDatasetsByRun(notes),
    screenText,
    grade
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startupAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiment);
