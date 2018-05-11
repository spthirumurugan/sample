import getDataCount from './get_data_count';
import allowNewDataset from './allow_new_dataset';

export default (notes) => {
  const count = getDataCount(notes);
  const moreThan20 = allowNewDataset(notes);
  if (count < 2 || moreThan20) {
    return 'one';
  }
  return 'two';
};
