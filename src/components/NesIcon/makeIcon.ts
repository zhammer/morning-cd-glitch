import styled, { css } from '../../custom/styled-components';

export default function makeIcon(size: number, matrix: number[][], colors: string[]) {
  return styled.i`
    position: relative;
    display: inline-block;
    width: ${size * matrix[0].length}px;
    height: ${matrix.length}px;

    &::before {
      position: absolute;
      top: -${size}px;
      left: -${size}px;
      content: '';
      background: transparent;
      ${pixelize(size, matrix, colors)};
    }
  `;
}

export function pixelize(
  size: number,
  matrix: number[][],
  colors: string[],
  options?: { defaultColor?: string }
) {
  const defaultColor = (options && options.defaultColor) || colors[matrixMode(matrix)];
  const boxShadowMatrix = matrix.map((row, rowIndex) =>
    row.map((colorKey, columnIndex) => {
      const color = colors[colorKey - 1];
      return `${(columnIndex + 1) * size}px ${(rowIndex + 1) * size}px${color ? ' ' + color : ''}`;
    })
  );
  return css`
    width: ${size}px;
    height: ${size}px;
    color: ${defaultColor};
    box-shadow: ${flatten(boxShadowMatrix).join(', ')};
  `;
}

function matrixMode<T>(matrix: Array<Array<T>>): T {
  const flattenedMatrix = flatten(matrix);
  const countByValue = flattenedMatrix.reduce(
    (curr, value) => new Map([...curr, ...new Map([[value, (curr.get(value) || 0) + 1]])]),
    new Map<T, number>()
  );
  return [...countByValue.entries()].reduce((prevEntry, currEntry) =>
    prevEntry[1] > currEntry[1] ? prevEntry : currEntry
  )[0];
}

function flatten<T>(matrix: Array<Array<T>>): Array<T> {
  return matrix.reduce((prev, curr) => [...prev, ...curr]);
}
