import getCurrentData from './get_current_data';

export default (notes) => {
  const dataset = getCurrentData(notes);
  if (dataset) {
    return dataset.data.value.length;
  }
  return 0;
};
