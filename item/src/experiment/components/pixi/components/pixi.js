import PIXI from 'pixi.js';
import ElementContainer from './element_container';

class Pixi extends PIXI.Container {

  constructor(el, width, height, elements, onHammerComplete) {
    super();
    this.element = elements;
    this.loader = PIXI.loader;
    // this.ticker = PIXI.ticker.shared;
    // this.ticker.autoStart = false;
    // this.ticker.stop();
    // Bind

    this.animate = this.animate.bind(this);
    // Append the pixi canvas to the el.
    this.renderer = PIXI.autoDetectRenderer(width, height, { transparent: true });
    el.appendChild(this.renderer.view);
    this.stage = new PIXI.Container();
    this.elementContainer = new ElementContainer(this.element, this.loader, onHammerComplete);
    this.frames = this.stage.addChild(this.elementContainer);
    // console.log('this.frames ', this.frames);
    // this.elements.forEach((element) => {
    //   // TODO : Allow for LayerContainers
    //   this.frames = this.stage.addChild(new ElementContainer(element, this.loader));
    //   // console.log('element', element.speed);
    //   // this.ticker.speed = 1;
    // });
    // Tigger loading of resources.
    this.loader.load();
    // this.ticker.start();

    // start animating
    requestAnimationFrame(this.animate);
    /* this.ticker.add(() => {
      this.renderer.render(this.stage);
    }); */
  }
  update(element, isAnimate) {
    this.elementContainer.update(element, isAnimate);
  }

  animate() {
    this.renderer.render(this.stage);
    requestAnimationFrame(this.animate);
  }

}

export default Pixi;
