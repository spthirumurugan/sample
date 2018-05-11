import { createSelector } from 'reselect';

const initState = state => state;

export const getGameOSTIndex = createSelector(
  [initState],
  (state) => {
    const { experiment: { initExperiment: { ostData, selected } } } = state;
    let ostIndex;
    let startIndex;
    ostData.reduce((p, c, i) => {
      if (c.game === selected && startIndex === undefined) {
        startIndex = i;
      }
      if (c.game === selected && !c.isShown && ostIndex === undefined) {
        ostIndex = i;
      }
      return p;
    }, undefined);
    ostIndex -= startIndex;
    return ostIndex;
  }
);

export default getGameOSTIndex;
