import { connect } from 'react-redux';
import React from 'react';
// In the cdlo this will come from the cdlo_components library.
import Overview from 'cdlo_components/overview/overview';
import Support from 'cdlo_components/support/support';
import MyReport from 'cdlo_components/report/my_report';

import rendererMap from '../notes/renderers/renderer_map';

/**
 * This is a simple wrapper component to hold the various modal components that
 * can be displayed with the App.
 * Overview:  picks up its content from the overview in config.
 * Support: picks up from support in config.
 * MyReport: This uses the MyReport component from the cdlo_components and passes
 * in a simple map that connects cdlo specific renderers with views in the notes
 * component.
 *
 * This component shouldn't need to chang going forward.
 * *POSSIBLE MOVE TO cdlo_components*
 *
 */
const Modals = () => (
  <div>
    <Overview />
    <Support />
    <MyReport rendererMap={rendererMap} />
  </div>
);

Modals.propTypes = {};

const mapState = state => ({
  selected: state.menu.selected
});


export default connect(mapState)(Modals);
