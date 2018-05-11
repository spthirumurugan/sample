import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import Draggable from 'react-draggable';
import Button from 'cdlo_components/ui/buttons/button';
import ImageLabel from 'cdlo_components/ui/image_label/image_label';
import BottomBar from 'cdlo_components/ui/bottom_bar/bottom_bar';
import ExperimentModal from './experiment_modal';
import { forceChange, activeScreen, refresh,
  start, questionPopup, screenPopup, activityChange,
  tablePopup, audioStart, pendulumStarData } from '../actions/activity_change';
import Pendulum from './pendulum';
import Table from './table';
import { getPendulumOSTState } from '../selectors/get_pendulum_ost_state';
import { getPendulumQuestionState } from '../selectors/get_pendulum_question_state';
import { getSaveState } from '../selectors/get_save_state';
import { getGameQuestionIndex } from '../selectors/get_game_question_index';
// import { getDataSet } from './table/selectors/get_data_set';
import getDataSetByGame from '../selectors/get_datasets_by_game';

const bgImage = require('../media/images/motion_games_02bg.png');
const scaleImage = require('../media/images/scale.png');

class PendulumContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameCompleted: false
    };
    this.startClick = this.startClick.bind(this);
    this.sliderUpdate = this.sliderUpdate.bind(this);
    this.prizeHitted = this.prizeHitted.bind(this);
    this.allPrizeHitted = this.allPrizeHitted.bind(this);
  }
  componentWillMount() {
    if (this.props.starData.indexOf(false) === -1) {
      this.setState({
        gameCompleted: true
      });
    }
  }
  componentDidMount() {
    if (this.props.ostPopup) {
      this.props.screenPopup(true);
    }
    if (this.props.quesPopup !== 'Phase0') {
      this.props.activityChange(this.props.quesPopup);
      this.props.questionPopup(true);
    }
    this.pend = new Pendulum(
      this.canvas,
      this.playpauseButton,
      this.startButton,
      scaleImage,
      this.props.starData,
      this.sliderUpdate,
      this.startClick,
      this.prizeHitted,
      this.allPrizeHitted,
      this.props.suffleRefresh);
  }
  componentDidUpdate() {
    if (this.props.ostPopup) {
      this.props.screenPopup(true);
    }
    if (this.props.quesPopup !== 'Phase0') {
      this.props.activityChange(this.props.quesPopup);
      this.props.questionPopup(true);
    }
    this.pend.update(this.props.suffleRefresh);
  }
  prizeHitted(index) {
    this.props.audioStart();
    this.props.pendulumStarData(index);
  }
  allPrizeHitted() {
    this.props.audioStart();
    this.setState({
      gameCompleted: true
    });
  }
  sliderUpdate(value) {
    this.props.forceChange(value);
  }
  startClick() {
    this.props.start(this.pend.tableData);
  }
  render() {
    return (
      <div>
        <div className="activity">Pendulum Prize</div>
        <div className="backgroundImageTag" >
          <ImageLabel src={bgImage} />
        </div>
        <canvas
          id="pendulum"
          ref={(el) => { this.canvas = el; }}
          width="1024px"
          height="587px"
          className="Pendulum"
        />
        {
          (this.state.gameCompleted)
          ?
            <div className="gameCompleted" />
          :
            null
        }

        <ExperimentModal isVisible={this.props.tabPopup} >
          <div>
            <Table type="pendulum" />
            <div className="button_pendulum_parent mt-20 text-center">
              <Button
                type={'solid'} disabled={this.props.saveEnable} onClick={() => this.props.tablePopup(false)}
              >Save</Button>
            </div>
          </div>
        </ExperimentModal>
        <div>
          <BottomBar className="bottom-navbar">
            <div className="outputbox">
              <div className="height mr-10">Starting Height on Left:</div>
              <div className="box">{this.props.value}</div>
              <div className="text">cm</div>
              <div className="height1 mr-10">Height on Right:</div>
              <div className="box1">{this.props.value}</div>
              <div className="text">cm</div>
              <div className="pendulum_button1_Container">
                <button className="btn btn-solid" ref={(el) => { this.startButton = el; }} >Start</button>
              </div>
              <button className={this.props.playpauseButton ? 'audioIcon nc-icon-glyph media-1_button-pause' : 'audioIcon nc-icon-glyph media-1_button-play'} ref={(elP) => { this.playpauseButton = elP; }} />
            </div>

            <div className="pendulum_button2_Container">
              <Button type={'solid'} onClick={() => this.props.onClickActive('intial')}>Choose Another Game</Button>
            </div>
            <div className="pendulum_button3_Container">
              <Button type={'solid'} onClick={() => this.props.refresh()}>Refresh</Button>
            </div>
          </BottomBar>
        </div>
      </div>
    );
  }
}
/* eslint-disable */
PendulumContainer.propTypes = {
  onClickActive: React.PropTypes.func,
  refresh: React.PropTypes.func,
  start: React.PropTypes.func,
  questionPopup: React.PropTypes.func,
  pendulumStarData: React.PropTypes.func,
  screenPopup: React.PropTypes.func,
  audioStart: React.PropTypes.func,
  forceChange: React.PropTypes.func,
  activityChange: React.PropTypes.func,
  quesPopup: React.PropTypes.string,
  starData: React.PropTypes.array,
  ostPopup: React.PropTypes.bool,
  tabPopup: React.PropTypes.bool,
  playpauseButton: React.PropTypes.bool,
  tablePopup: React.PropTypes.func,
  saveEnable: React.PropTypes.bool,
  value: React.PropTypes.number
};
/* eslint-enable */
function mapStateToProps(state) {
  const { experiment } = state;
  const { screens, tabPopup, selected, suffleRefresh } = experiment.initExperiment;
  const { force, starData, attempts } = screens[1];
  return {
    screens,
    attempts,
    suffleRefresh,
    value: force,
    viewDataSet: getDataSetByGame(state, { type: 'pendulum' }).length,
    ostPopup: getPendulumOSTState(state),
    quesPopup: getPendulumQuestionState(state),
    questionIndex: getGameQuestionIndex(state),
    saveEnable: getSaveState(state, { type: selected }),
    starData,
    tabPopup
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    start,
    refresh,
    forceChange,
    questionPopup,
    screenPopup,
    tablePopup,
    audioStart,
    pendulumStarData,
    activityChange,
    onClickActive: activeScreen
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PendulumContainer);
