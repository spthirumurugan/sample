export default function updateDatasetType(dataset, item, updatetype) {
  const currDataset = Object.assign(dataset);
  currDataset.data[`${item}`].type = updatetype;
  return currDataset;
}
