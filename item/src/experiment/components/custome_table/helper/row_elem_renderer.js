import Image from '../components/image';

export default function rowElemRenderer(type, value) {
  let res = '';
  switch (type) {
    case 'image': res = Image(type, value);
      break;
    // case 'input': res = Input(value);
    //   break;
    default:
      res = value;
      break;
  }
  return res;
}
