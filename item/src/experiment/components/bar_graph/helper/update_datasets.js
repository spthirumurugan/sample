export default function updateDatasets(datasets) {
  const arr = [];
  datasets.forEach((dataset, index) => {
    arr[index] = {
      ...dataset.data
    };
    Object.keys(arr[index]).forEach((d) => {
      arr[index][d] = dataset.data[d].data;
    });
  });

  return arr;
}
