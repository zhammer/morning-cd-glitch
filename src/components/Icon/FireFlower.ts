import { makeIcon } from './makeIcon';

const matrix = [
  [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0],
  [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
  [0, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 0],
  [4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4],
  [4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4],
  [0, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 0],
  [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
  [0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1],
  [0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
];
//          plant      inner      mid        outer
const a = ['#02A801', '#000000', '#C84C0C', '#FCD8A8'];
const b = ['#02A801', '#D92800', '#887001', '#FD9837'];
const c = ['#02A801', '#02A801', '#FD9837', '#FFFFFF'];
const d = ['#02A801', '#D92800', '#FD9837', '#FFFFFF'];

export default {
  a: makeIcon(matrix, a),
  b: makeIcon(matrix, b),
  c: makeIcon(matrix, c),
  d: makeIcon(matrix, d)
};