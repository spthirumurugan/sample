import last from 'lodash/last';

export default notes => notes.byId[last(notes.datasetIds)];
