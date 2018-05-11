const uuidV1 = require('uuid/v1');

let viewId = '';
let datasetId = '';

export function createUniqueId() {
  return uuidV1();
}

export function createSnapDataset(obj) {
  const { dataset } = obj;
  const datasetObj = {};
  datasetId = createUniqueId();
  datasetObj[datasetId] = {
    id: datasetId,
    type: 'dataset',
    timeStamp: Date.now(),
    data: dataset
  };
  return datasetObj;
}

export function createSnapView(obj, rId) {
  const { componentName } = obj;
  const viewObj = {};
  viewId = createUniqueId();
  viewObj[viewId] = {
    id: viewId,
    runId: rId,
    type: 'view',
    timeStamp: Date.now(),
    renderer: 'snapshot',
    component: componentName,
    dataId: datasetId
  };
  return viewObj;
}
