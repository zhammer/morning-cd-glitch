import styled from '../../custom/styled-components';
import makeIcon from './makeIcon';

const pokeballMatrix = [
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0, 0],
  [0, 0, 1, 3, 3, 2, 2, 2, 2, 2, 2, 1, 0, 0],
  [0, 1, 3, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0],
  [0, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
  [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1],
  [1, 1, 1, 1, 2, 2, 1, 3, 3, 3, 1, 2, 2, 1],
  [1, 4, 3, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1],
  [0, 1, 3, 3, 3, 1, 1, 3, 3, 3, 1, 3, 1, 0],
  [0, 1, 3, 3, 3, 3, 3, 1, 1, 1, 3, 3, 1, 0],
  [0, 0, 1, 4, 4, 3, 3, 3, 3, 3, 3, 1, 0, 0],
  [0, 0, 0, 1, 1, 4, 4, 4, 4, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0]
];
const pokeballColors = ['#060606', '#ff001d', '#fff', '#9fa1a1'];
const pokeballSize = 6;
const Pokeball = makeIcon(pokeballSize, pokeballMatrix, pokeballColors);

export default {
  Pokeball
};
