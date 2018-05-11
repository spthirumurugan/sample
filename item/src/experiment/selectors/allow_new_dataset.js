import getDataCount from './get_data_count';
import getWordCount from './get_word_count';

export default (notes) => {
  const dataCount = getDataCount(notes);
  const wordCount = getWordCount(notes);
  if (dataCount === 0) {
    return false;
  } else if (wordCount > 20) {
    return false;
  }
  return true;
};
