import { buildMatrixPartFour } from '@/utils/general/matrix';
import { measure } from '@/utils/server/measure';
import type { NextApiRequest, NextApiResponse } from 'next';

const checkArea = (
  word: string,
  matrix: string[][],
  rowIndex: number,
  cellIndex: number
) => {
  const x: string[] = [];
  const y: string[] = [];
  const f: string[] = [];
  const d: string[] = [];

  const variations = [word, word.split('').reverse().join('')];

  for (let i = -(word.length - 1); i < word.length; i++) {
    x.push(matrix[rowIndex][cellIndex + i]);
    y.push(matrix[rowIndex + i]?.[cellIndex]);
    f.push(matrix[rowIndex + i]?.[cellIndex + i]);
    d.push(matrix[rowIndex + i]?.[cellIndex - i]);
  }

  const median = word.length - 1;

  const words = [x, y, f, d]
    .map((v) => [
      v.slice(0, median).join('') + word[0],
      word[0] + v.slice(median + 1).join(''),
    ])
    .flat();

  return words.reduce(
    (acc, next) => acc + (variations.includes(next) ? 1 : 0),
    0
  );
};

const solution = (input: string, searchFor: string) => {
  const matrix = buildMatrixPartFour(input);
  let occured = 0;

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
      const cell = matrix[i][j];
      if (cell === searchFor[0]) {
        occured += checkArea(searchFor, matrix, i, j);
      }
    }
  }

  return occured;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const input = req.body.input;
  let result;

  const ellapsed = measure(() => {
    result = solution(input, 'XMAS');
  });

  res.status(200).json({
    result,
    ellapsed,
  });
}
