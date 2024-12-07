import { buildMatrixPartFour } from '@/utils/general/matrix';
import { reverse } from '@/utils/general/reverse';
import { measure } from '@/utils/server/measure';
import type { NextApiRequest, NextApiResponse } from 'next';

const checkArea = (
  word: string,
  matrix: string[][],
  rowIndex: number,
  cellIndex: number
) => {
  const f: string[] = [];
  const d: string[] = [];

  const sides = Math.ceil(word.length / 2);
  const variations = [word, reverse(word)];

  for (let i = -(sides - 1); i < sides; i++) {
    f.push(matrix[rowIndex + i]?.[cellIndex + i]);
    d.push(matrix[rowIndex + i]?.[cellIndex - i]);
  }

  const words = [f, d].map((v) => [v.join('')]).flat();

  const isSearched = words.every((w) => variations.includes(w));

  return isSearched ? 1 : 0;
};

const solution = (input: string, searchFor: string) => {
  const matrix = buildMatrixPartFour(input);
  let occured = 0;

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];
    for (let j = 0; j < row.length; j++) {
      const cell = matrix[i][j];
      if (cell === searchFor[Math.floor(searchFor.length / 2)]) {
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
    result = solution(input, 'MAS');
  });

  res.status(200).json({
    result,
    ellapsed,
  });
}
