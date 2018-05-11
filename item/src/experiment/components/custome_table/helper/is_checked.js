import includes from 'lodash/includes';

export default function isChecked(datasetIds, datasetId) {
  return includes(datasetIds, datasetId);
}
