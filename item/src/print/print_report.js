import React from 'react';
import DraftEditor from 'cdlo_components/report/components/draft_editor';
import K2DraftEditor from 'cdlo_components/report/components/k2_draft_editor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import printAction from 'cdlo_components/report/actions/print_action';
import IconButton from 'cdlo_components/ui/buttons/icon_button';

import rendererMap from '../notes/renderers/renderer_map';

class PrintReport extends React.Component {

  componentDidMount() {
    document.body.classList.toggle('print-background', true);
  }
  componentWillUnmount() {
    document.body.classList.remove('print-background');
  }

  render() {
    return (
      <div className={'container print_report'}>
        <div className={'col-md-12'}>
          <IconButton onClick={this.props.printAction} align={'right'} type={'ui-1_circle-remove'} >Close</IconButton>
          <div className={'mt-100'}>
            { (this.props.grade !== 'k2') ?
              <DraftEditor printMode rendererMap={rendererMap} />
            :
              <K2DraftEditor printMode rendererMap={rendererMap} />
          }
          </div>
        </div>
      </div>
    );
  }
}

PrintReport.propTypes = {
  printAction: React.PropTypes.func.isRequired,
  grade: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    grade: state.metadata.grade
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ printAction }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(PrintReport);
