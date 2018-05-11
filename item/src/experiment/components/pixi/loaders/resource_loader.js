import PIXI from 'pixi.js';
import webpackJsonLoader from './webpack_json_loader';

function resourceLoader(elements) {
  const loader = PIXI.loader;

  elements.forEach((item) => {
    item.states.items.forEach((stateId) => {
      const state = item.states.byId[stateId];
      webpackJsonLoader(`${item.id}_${state.id}`, state.image, state.data);
    });
  });

  const promise = new Promise((resolve, reject) => {
    loader.once('complete', () => {
      const library = new Map();
      elements.forEach((item) => {
        item.states.items.forEach((stateId) => {
          let ss = [];
          let mc = {};
          const state = item.states.byId[stateId];
          ss = Object.keys(state.data.frames).sort();
          mc = new PIXI.extras.MovieClip(
            ss.map(id => PIXI.Texture.fromImage(id))
          );
          mc.loop = state.loop;
          mc.scale.set(0.5);
          mc.animationSpeed = 1;
          library.set(`${item.id}_${state.id}`, mc);
        });
      });
      resolve(library);
    });

    loader.once('error', reject);
  });

  loader.load();
  return promise;
}


export default resourceLoader;
