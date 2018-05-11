import PIXI from 'pixi.js';
import webpackJsonLoader from '../loaders/webpack_json_loader';
import DraggableContainer from './draggable_container';

class ElementContainer extends DraggableContainer {
  constructor(element, loader = PIXI.loader, onHammerComplete) {
    super(element.draggable);
    this.update = this.update.bind(this);

    this.id = element.id;
    this.isAnimate = element.isAnimate;
    this.name = element.name;
    this.position.x = element.x;
    this.position.y = element.y;
    this.onHammerComplete = onHammerComplete;

    this.element = element;
    this.stateLibrary = new Map();

    // Push items into the resource loader.
    element.states.items.forEach((stateId) => {
      const state = element.states.byId[stateId];
      webpackJsonLoader(`${element.id}_${state.id}`, state.image, state.data);
    });

    // Handle resource loading callback.
    loader.once('complete', () => {
      element.states.items.forEach((stateID) => {
        const state = element.states.byId[stateID];
        const frames = Object.keys(state.data.frames).sort();
        const movieClip = new PIXI.extras.MovieClip(
          frames.map(id => PIXI.Texture.fromImage(id))
        );
        movieClip.loop = state.loop;
        movieClip.animationSpeed = (state.speed !== undefined ? state.speed : 0.5);
        movieClip.anchor.set(0.5);
        movieClip.scale.set(0.5);

        this.stateLibrary.set(`${element.id}_${state.id}`, movieClip);
      });
      this.update(this.element, this.isAnimate);
    });
  }

  update(element, isAnimate) {
    this.element = element;
    this.removeChildren();
    const mcID = `${element.id}_${element.states.selected}`;
    const movieClip = this.stateLibrary.get(mcID);
    this.addChild(movieClip);
    movieClip.anchor.set(0.5);

    if (isAnimate) {
      this.children[0].play();
    }
    this.children[0].onComplete = (() => {
      setTimeout(() => {
        this.children[0].gotoAndStop(0);
        this.onHammerComplete();
      }, 800);
    });
  }
}

export default ElementContainer;
