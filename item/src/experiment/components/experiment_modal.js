import React, { PropTypes } from 'react';

const ExperimentModal = props =>
  <div className="experiment_modal_container" style={{ display: (props.isVisible) ? 'block' : 'none' }}>
    <div className={'experiment_modal_overlay'} />
    <div className="experiment_modal">
      {/* <button className={'close-button nc-icon-glyph ui-1_circle-remove'}
        onClick={() => props.modalClose()} /> */}
      <div>{props.children}</div>
    </div>
  </div>;

ExperimentModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isVisible: PropTypes.bool
};

ExperimentModal.defaultProps = {
  children: '',
  isVisible: false
};

export default ExperimentModal;
