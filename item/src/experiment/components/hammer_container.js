import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { playAudio } from 'cdlo_components/audio_component/export';
import Button from 'cdlo_components/ui/buttons/button';
import ImageLabel from 'cdlo_components/ui/image_label/image_label';
import Slider from 'cdlo_components/ui/forms/slider/slider';
import BottomBar from 'cdlo_components/ui/bottom_bar/bottom_bar';
import ExperimentModal from './experiment_modal';
import { forceChange, activeScreen, refresh, activityChange,
  start, questionPopup, screenPopup, tablePopup, toggleHammerAnim,
  completeOstPopup, updateDataset, audioStart } from '../actions/activity_change';
import { addViews } from '../actions/note_action';
import Hammer from './hammer';
import Table from './table';
import PixiCanvas from './pixi/components/pixi_canvas';
import { getHammerOSTState } from '../selectors/get_hammer_ost_state';
import { getHammerQuestionState } from '../selectors/get_hammer_question_state';
import { getSaveState } from '../selectors/get_save_state';
import sliderData from '../../config/experiment/hammer_data';

const bgImage = require('../media/images/motion_games_01bg.png');

class HammerBell extends React.Component {
  constructor() {
    super();
    this.fnCallBack = this.fnCallBack.bind(this);
    this.hammerRender = this.hammerRender.bind(this);
  }

  componentDidMount() {
    if (this.props.ostPopup) {
      this.props.screenPopup(true);
    }
    if (this.props.quesPopup !== 'Phase0') {
      this.props.activityChange(this.props.quesPopup);
      this.props.questionPopup(true);
    }
    this.createHammerObj();
  }
  componentDidUpdate() {
    if (this.props.ostPopup) {
      this.props.screenPopup(true);
    }
    if (this.props.quesPopup !== 'Phase0') {
      this.props.activityChange(this.props.quesPopup);
      this.props.questionPopup(true);
    }
    this.hammer.update(this.props.ballHeight, this.props.value);
  }
  createHammerObj() {
    this.hammer = new Hammer(
              this.canvas,
              this.playButton,
              this.props.start,
              this.props.value,
              this.props.tablePopup,
              this.props.ballHeight,
              this.props.toggleHammerAnim,
              this.props.playAudio,
              this.props.completeOstPopup
            );
    return this.hammer;
  }
  fnCallBack() {
    this.hammer.doPlay();
    this.props.toggleHammerAnim(false);
  }
  hammerRender() {
    this.props.tablePopup(false);
    this.createHammerObj();
  }
  render() {
    const self = this;
    return (
      <div>
        <ImageLabel src={bgImage} />
        <div className="activity">Ring the Bell</div>
        <canvas
          id="hammerBell"
          ref={(el) => { this.canvas = el; }}
          width="1024"
          height="587"
          className="hammerBell"
        />
        <div className="canvasParent">
          <PixiCanvas
            onHammerComplete={self.fnCallBack}
            elements={self.props.spriteData}
            width={1024}
            height={587}
          />
        </div>
        <ExperimentModal isVisible={this.props.tabPopup} >
          <div>
            <Table type="hammerBell" />
            <div className="button_hammer_parent mt-20 text-center">
              <Button
                type={'solid'} disabled={this.props.saveEnable} onClick={self.hammerRender}
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
HammerBell.propTypes = {
  onClickActive: React.PropTypes.func,
  value: React.PropTypes.number,
  ballHeight: React.PropTypes.number,
  forceChange: React.PropTypes.func,
  refresh: React.PropTypes.func,
  activityChange: React.PropTypes.func,
  screens: React.PropTypes.array,
  questionset: React.PropTypes.array,
  viewStruct: React.PropTypes.object,
  tableNotes: React.PropTypes.object,
  tableData: React.PropTypes.object,
  spriteData: React.PropTypes.object,
  tabPopup: React.PropTypes.bool,
  start: React.PropTypes.func,
  tablePopup: React.PropTypes.func,
  playAudio: React.PropTypes.func,
  ostPopup: React.PropTypes.bool,
  quesPopup: React.PropTypes.string,
  saveEnable: React.PropTypes.bool,
  screenPopup: React.PropTypes.func,
  questionPopup: React.PropTypes.func,
  toggleHammerAnim: React.PropTypes.func,
  completeOstPopup: React.PropTypes.func
};
/* eslint-enable */
function mapStateToProps(state) {
  const { experiment } = state;
  const { screens, tabPopup, selected } = experiment.initExperiment;
  const { force } = screens[0];
  return {
    screens,
    value: force,
    tabPopup,
    spriteData: experiment.initExperiment.hammerAnim,
    activitySelected: experiment.selected,
    saveEnable: getSaveState(state, { type: selected }),
    ostPopup: getHammerOSTState(state),
    quesPopup: getHammerQuestionState(state),
    ballHeight: sliderData[force].height
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
    addViews,
    updateDataset,
    completeOstPopup,
    onClickActive: activeScreen,
    audioStart,
    toggleHammerAnim,
    playAudio,
    activityChange
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HammerBell);
