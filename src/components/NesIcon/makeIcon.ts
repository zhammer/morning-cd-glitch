import styled, { css } from '../../custom/styled-components';

export default function makeIcon(size: number, matrix: number[][], colors: string[]) {
  return styled.i`
    position: relative;
    display: inline-block;
    width: ${size * matrix[0].length}px;
    height: ${size * matrix.length}px;

    &::before {
      position: absolute;
      top: -${size}px;
      left: -${size}px;
      content: '';
      background: transparent;
      ${props => pixelize(size, matrix, colors.length > 0 ? colors : [props.theme.base])};
    }
  `;
}

export function pixelize(size: number, matrix: number[][], colors: string[]) {
  const boxShadowMatrix = matrix.map((row, rowIndex) =>
    row.map((colorKey, columnIndex) => {
      const color = colors[colorKey - 1];
      return `${(columnIndex + 1) * size}px ${(rowIndex + 1) * size}px${color ? ' ' + color : ''}`;
    })
  );
  return css`
    width: ${size}px;
    height: ${size}px;
    color: rgba(0, 0, 0, 0);
    box-shadow: ${flatten(boxShadowMatrix).join(', ')};
  `;
}

function flatten<T>(matrix: Array<Array<T>>): Array<T> {
  return matrix.reduce((prev, curr) => [...prev, ...curr]);
}
