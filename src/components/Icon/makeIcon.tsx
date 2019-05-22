import React from 'react';

export function makeIcon(matrix: number[][], colors: string[]) {
  const matrixInvalidReason = checkMatrixInvalid(matrix, colors);
  if (matrixInvalidReason) {
    throw new Error(matrixInvalidReason);
  }

  const pixelMatrix = makePixelMatrix(matrix, colors);

  return buildSvg(pixelMatrix);
}

interface Pixel {
  color: string | null;
}

function buildSvg(pixelMatrix: Pixel[][]) {
  const height = pixelMatrix.length;
  const width = pixelMatrix[0].length;

  const rectMatrix = pixelMatrix.map((row, rowIndex) =>
    row.map((pixel, columnIndex) => (
      <rect
        key={`${rowIndex},${columnIndex}`}
        x={columnIndex}
        y={rowIndex}
        width={1.05}
        height={1.05}
        fill={pixel.color || 'rgba(0,0,0,0)'}
      />
    ))
  );
  const rects = flattenMatrix(rectMatrix);
  return () => (
    <svg viewBox={`0 0 ${width} ${height}`} height='100%'>
      {rects}
    </svg>
  );
}

function checkMatrixInvalid(matrix: number[][], colors: string[]): string | null {
  if (matrix.length === 0) {
    return 'Matrix has 0 rows';
  }

  if (hasIrregularRowLengths(matrix)) {
    return 'Matrix rows must all have same length.';
  }

  if (colorsDontMapToMatrix(matrix, colors)) {
    return 'Invalid mapping of colors to matrix values.';
  }

  return null;
}

function makePixelMatrix(matrix: number[][], colors: string[]): Pixel[][] {
  return matrix.map(row =>
    row.map(colorsIndex => {
      const color = colors[colorsIndex - 1];
      return { color };
    })
  );
}

function colorsDontMapToMatrix(matrix: number[][], colors: string[]): boolean {
  const flattenedMatrix = flattenMatrix(matrix);
  return flattenedMatrix.some(value => value < 0 || value > colors.length);
}

function hasIrregularRowLengths(matrix: any[][]): boolean {
  const lengths = matrix.map(row => row.length);
  const lengthsSet = new Set(lengths);
  return lengthsSet.size !== 1;
}

function flattenMatrix<T>(matrix: T[][]): T[] {
  return matrix.reduce((prev, curr) => [...prev, ...curr]);
}
