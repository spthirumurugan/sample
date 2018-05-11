import React, { PropTypes } from 'react';
import PIXI from 'pixi.js';
import Pixi from './pixi';

class PixiCanvas extends React.Component {

  componentDidMount() {
    const { elements, width, height, onHammerComplete } = this.props;

    this.pixi = new Pixi(
      this.el,
      width,
      height,
      elements,
      onHammerComplete
    );
  }
  componentDidUpdate() {
    this.pixi.update(this.props.elements,
      this.props.elements.isAnimate,
      this.props.onHammerComplete
    );
  }
  componentWillUnmount() {
    this.pixi.destroy({ children: true });
    PIXI.loader.reset();
  }

  render() {
    return <div ref={el => (this.el = el)} />;
  }
}

PixiCanvas.propTypes = {
  // eslint-disable-next-line
  elements: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  onHammerComplete: PropTypes.func
};

export default PixiCanvas;
