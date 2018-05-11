import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'cdlo_components/ui/buttons/button';
import ImageLabel from 'cdlo_components/ui/image_label/image_label';
import Slider from 'cdlo_components/ui/forms/slider/slider';
import BottomBar from 'cdlo_components/ui/bottom_bar/bottom_bar';
import ExperimentModal from './experiment_modal';
import { forceChange, activeScreen, refresh, start,
  questionPopup, createView, screenPopup, activityChange,
  tablePopup, completeOstPopup } from '../actions/activity_change';
import Table from './table';
import ShuffleBoard from './shuffle_board';
import ShuffleBoardData from '../../config/experiment/shuffle_board_data';
import { getShuffuleBoardOSTState } from '../selectors/get_shuffleboard_ost_state';
import { getShuffuleBoardQuestionState } from '../selectors/get_shuffleboard_question_state';
import { getSaveState } from '../selectors/get_save_state';


const bgImage = require('../media/images/motion_games_03bg.png');


class ShuffleBoardContainer extends React.Component {
  componentDidMount() {
    if (this.props.ostPopup) {
      this.props.screenPopup(true);
    }
    if (this.props.quesPopup !== 'Phase0') {
      this.props.activityChange(this.props.quesPopup);
      this.props.questionPopup(true);
    }
    this.shuffle = new ShuffleBoard(
      this.canvas,
      this.props.value,
      ShuffleBoardData,
      this.props.start,
      this.playButton,
      this.props.tablePopup,
      this.props.completeOstPopup,
      this.props.suffleRefresh
    );
  }
  componentDidUpdate() {
    if (this.props.ostPopup) {
      this.props.screenPopup(true);
    }
    if (this.props.quesPopup !== 'Phase0') {
      this.props.activityChange(this.props.quesPopup);
      this.props.questionPopup(true);
    }
    this.shuffle.update(this.props.value, this.props.suffleRefresh);
  }
  render() {
    return (
      <div>
        <div className="activityDir">Direction</div>
        <div className="activity">Shuffleboard</div>
        <ImageLabel src={bgImage} />
        <canvas
          id="shuffleboard"
          ref={(el) => { this.canvas = el; }}
          width="1024px"
          height="587px"
          className="shuffleboard"
        />
        <ExperimentModal isVisible={this.props.tabPopup}>
          <div>
            <Table type="shuffleBoard" />
            <div className="button_shuffle_parent mt-20 text-center">
              <Button
                type={'solid'}
                disabled={this.props.saveEnable} onClick={() => this.props.tablePopup(false)}
              >Save</Button>
            </div>
          </div>
        </ExperimentModal>
        <div>
          <BottomBar className="bottom-navbar">
            <div className="slider_text">Force</div>
            <div className="slider_Container">
              <Slider
                className="rc-slider-dotted"
                dots
                marks
                max={10}
                min={0}
                step={1}
                value={this.props.value}
                onChange={this.props.forceChange}
              />
            </div>
            <div className="button_Container_Parent">
              <div className="button1_Container">
                <button
                  className="btn btn-solid"
                  disabled={(this.props.value < 1)}
                  ref={(elP) => { this.playButton = elP; }}
                >Start
                </button>
              </div>
              <div className="button2_Container">
                <Button type={'solid'} onClick={() => this.props.onClickActive('intial')}>
                Choose Another Game</Button>
              </div>
              <div className="button3_Container">
                <Button type={'solid'} onClick={() => this.props.refresh()}>Refresh</Button>
              </div>
            </div>
          </BottomBar>
        </div>
      </div>
    );
  }
}
/* eslint-disable */
ShuffleBoardContainer.propTypes = {
  onClickActive: React.PropTypes.func,
  value: React.PropTypes.number,
  forceChange: React.PropTypes.func,
  refresh: React.PropTypes.func,
  activityChange: React.PropTypes.func,
  screens: React.PropTypes.array,
  questionset: React.PropTypes.object,
  tableData: React.PropTypes.object,
  start: React.PropTypes.func,
  questionPopup: React.PropTypes.func,
  screenPopup: React.PropTypes.func,
  tablePopup: React.PropTypes.func,
  ostPopup: React.PropTypes.bool,
  tabPopup: React.PropTypes.bool,
  suffleRefresh: React.PropTypes.bool,
  quesPopup: React.PropTypes.string,
  saveEnable: React.PropTypes.bool,
  completeOstPopup: React.PropTypes.func
};
/* eslint-enable */
function mapStateToProps(state) {
  const { experiment } = state;
  const { screens, tabPopup, suffleRefresh } = experiment.initExperiment;
  const { force } = screens[2];
  return {
    screens,
    suffleRefresh,
    value: force,
    saveEnable: getSaveState(state, { type: 'shuffleBoard' }),
    ostPopup: getShuffuleBoardOSTState(state),
    quesPopup: getShuffuleBoardQuestionState(state),
    tabPopup
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    start,
    refresh,
    forceChange,
    questionPopup,
    createView,
    screenPopup,
    tablePopup,
    completeOstPopup,
    activityChange,
    onClickActive: activeScreen
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShuffleBoardContainer);
