import { connect } from 'react-redux';
import React from 'react';
import ShortcutIcons from 'cdlo_components/shortcut_icons/shortcut_icons';
import rendererMap from '../notes/renderers/renderer_map';

const SidePannel = () => (
  <ShortcutIcons rendererMap={rendererMap} />
);

SidePannel.propTypes = {};

const mapState = state => ({
  
});


export default connect(mapState)(SidePannel);
