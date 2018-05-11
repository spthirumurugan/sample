import PIXI from 'pixi.js';

class DraggableContainer extends PIXI.Container {

  constructor(draggable) {
    super();

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    this.interactive = draggable;
    this.buttonMode = draggable;
    this.on('mousedown', this.onDragStart)
        .on('touchstart', this.onDragStart)
        .on('mouseup', this.onDragEnd)
        .on('mouseupoutside', this.onDragEnd)
        .on('touchend', this.onDragEnd)
        .on('touchendoutside', this.onDragEnd)
        .on('mousemove', this.onDragMove)
        .on('touchmove', this.onDragMove);
  }

  onDragStart(event) {
    this.data = event.data;
    this.dragging = true;
    this.scale.set(1.3);
  }
  onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.position.x = newPosition.x;
      this.position.y = newPosition.y;
    }
  }
  onDragEnd() {
    this.dragging = false;
    this.data = null;
    this.scale.set(1.0);
  }

}

export default DraggableContainer;
