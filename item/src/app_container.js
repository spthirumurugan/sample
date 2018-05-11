import React from 'react';
import { connect } from 'react-redux';

import MyReportPage from 'cdlo_components/report/my_report_page';
import NotesPanel from 'cdlo_components/notes/note_panel/note_panel';
import Reset from 'cdlo_components/ui/reset/component/reset';

import Modals from './modals/modals';
// import SidePannel from './modals/side_pannel';
import Experiment from './experiment/components/experiment';
import PrintReport from './print/print_report';


import rendererMap from './notes/renderers/renderer_map';
/**
 * This redraws the app when print is set to display
 * a print version of the report
 * @param {[type]} print [description]
 */
const AppContainer = ({ print, selected, grade }) => {
  if (print) {
    return (
      <PrintReport />
    );
  }
  return (
    <div>
      { (selected === 'experimentMenu') ?
        <div className={'container'}>
          <Experiment />
        </div>
        : null }
      { (selected === 'myreport') ? <MyReportPage rendererMap={rendererMap} /> : null }
      { (grade !== 'k2') ? <NotesPanel rendererMap={rendererMap} /> : null }
      <Modals />
      <Reset />
    </div>
  );
};

AppContainer.propTypes = {
  grade: React.PropTypes.string.isRequired,
  print: React.PropTypes.bool.isRequired,
  selected: React.PropTypes.string.isRequired
};

function mapStateToProps({ myreport, menu, metadata }) {
  return {
    grade: metadata.grade,
    print: myreport.print,
    selected: menu.selectedTab
  };
}

export default connect(mapStateToProps)(AppContainer);
