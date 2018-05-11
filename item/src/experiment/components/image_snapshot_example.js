import React, { PropTypes } from 'react';
import ImageLabel from 'cdlo_components/ui/image_label/image_label';
import IconButton from 'cdlo_components/ui/buttons/icon_button';
import { connect } from 'react-redux';
import ImageSnapshotAction from '../../notes/actions/image_snapshot_action';

const ImageSnapshotExample = props => (<div>
  <IconButton
    type={'media-1_camera-20'}
    onClick={() => props.dispatch(ImageSnapshotAction(props.src))}
  />
  <ImageLabel
    src={props.src}
  />
</div>);

ImageSnapshotExample.propTypes = {
  src: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(ImageSnapshotExample);
