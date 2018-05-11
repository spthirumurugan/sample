import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExperimentContainer from 'cdlo_components/ui/containers/experiment_container';
import { addQuestions, updateAnswer, submitAction } from '../actions/note_action';
import { createViews } from '../actions/activity_change';
// import renderComponent from '../render_component/render_components';
import OstComponent from './ost_component';
import OstCompleteComponent from './ost_complete_component'
import QuestionPanelContainer from './question_panel_container';
// import { getDataSet } from './table/selectors/get_data_set';
import getDataSetByGame from '../selectors/get_datasets_by_game';
import InitialScreen from './initial_screen';
import HammerBell from './hammer_container';
import ShuffleBoardContainer from './shuffle_container';
import PendulumContainer from './pendulum_container';
import screen from '../selectors/screen';
import getSelectedGameQues from '../selectors/get_selected_game_ques';

export const InitExperiment = props => (
  <div>
    <ExperimentContainer bgSrc="">
      <div style={{ position: 'relative' }}>
        {
         props.screenStatus.intialScreen ? <InitialScreen /> : null
        }
        {
          props.screenStatus.hammerBell ? <HammerBell /> : null
        }
        {
          props.screenStatus.pendulum ? <PendulumContainer /> : null
        }
        {
          props.screenStatus.shuffleBoard ? <ShuffleBoardContainer /> : null
        }
        {
          (props.gameCompleted)
          ?
            <div className="gameCompleted" />
          :
            null
        }
        {
             (props.ostPopup && props.gameQues !== -1)
            ? <OstComponent i={props.gameQues} />
            : null
        }
        {
            (props.ostCompletePopup)
            ? <OstCompleteComponent />
            : null
        }
        <QuestionPanelContainer />
      </div>
    </ExperimentContainer>
  </div>
);

InitExperiment.propTypes = {
  /* eslint-disable */
  screenStatus: PropTypes.object,

  /* eslint-enable */
  addQuestions: PropTypes.func,
  createViews: PropTypes.func,
  questionPopup: PropTypes.bool,
  ostCompletePopup: PropTypes.bool,
  gameCompleted: PropTypes.bool,
  ostPopup: PropTypes.bool,
  selected: PropTypes.string,
  gameQues: PropTypes.number
};

function mapStateToProps(state) {
  const { experiment } = state;
  const { selected } = state.menu;
  const { questionPopup, ostPopup, screens, ostCompletePopup } = experiment.initExperiment;
  const { questionIds } = state.notes;
  const game = state.experiment.initExperiment.selected;
  const dataSets = getDataSetByGame(state, { type: game });
  let attempts = -1;
  screens.map((v) => {
    if (v.id === game) {
      attempts = v.attempts;
    }
    return v;
  });
  return {
    state,
    selected,
    questionIds,
    ostCompletePopup,
    screenStatus: screen(state),
    gameQues: getSelectedGameQues(state),
    gameCompleted: (dataSets.length === attempts),
    name: 'state.experiment.name',
    questionPopup,
    ostPopup
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addQuestions,
    updateUserAnswer: updateAnswer,
    submitBtnAction: submitAction,
    createViews
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InitExperiment);
