import { createSelector } from 'reselect';

const propsData = state => state;
const getProps = (state, props) => props;
let sPhase = null;

function phaseComplete(phaseData) {
  return phaseData.activityName === sPhase;
}

const questionCompleteStatus = createSelector(
  [propsData, getProps],
  (state, props) => {
    const { notes } = state;
    sPhase = props;
    let isComplted = false;
    const rData = state.notes.questionIds.reduce((p, u) => {
      return [...p, notes.byId[u]];
    }, 0);
    if (rData.filter(phaseComplete).length > 0) {
      isComplted = rData.filter(phaseComplete).reduce((p, u) => {
        let completed = false;
        if (u.isEnd) {
          completed = true;
        }
        return completed;
      }, 0);
    }
    return isComplted;
  }
);

export default questionCompleteStatus;
