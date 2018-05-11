import { createSelector } from 'reselect';

const getProps = (state, props1, props2) => { const props = { props1, props2 }; return props; };
const initState = state => state;

const getTableDatasets = createSelector(
  [initState, getProps],
  (state, props) => {
    const { notes: { byId } } = state;
    const viewKeys = byId[props.props1].schema.props;
    const dataKeys = props.props2;
    const tableSets = [];

    dataKeys.map((val) => {
      const keys = Object.keys(byId[val]);
      keys.splice(keys.indexOf('id'), 1);
      keys.splice(keys.indexOf('runId'), 1);
      keys.splice(keys.indexOf('timestamp'), 1);
      keys.splice(keys.indexOf('gameType'), 1);
      keys.splice(keys.indexOf('observationType'), 1);
      if (viewKeys.length === keys.length && byId[props.props1].runId === byId[val].runId) {
        tableSets.push(val);
      }
      return val;
    });
    return tableSets;
  }
);

export default getTableDatasets;
