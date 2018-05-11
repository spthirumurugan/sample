import Image from '../components/image';

export default function headerElemRenderer(type, src, label) {
  let res = '';
  switch (type) {
    case 'image': res = Image(type, src);
      break;
    default:
      res = label;
      break;
  }
  return res;
}
