import { measure } from '@/utils/server/measure';
import { parseDayTwo } from '@/utils/server/parse';
import type { NextApiRequest, NextApiResponse } from 'next';

const solution = (input: string) => {
  const data = parseDayTwo(input);
  let right = 0;
  const wrongList = [];
  const rightList = [];
  cellLoop: for (let i = 0; i < data.length; i++) {
    const cell = data[i];

    const direction = cell[0] < cell[1] ? 1 : 0;

    for (let j = 0; j < cell.length - 1; j++) {
      if (
        (direction && cell[j] > cell[j + 1]) ||
        (!direction && cell[j] < cell[j + 1]) ||
        cell[j] === cell[j + 1] ||
        Math.abs(cell[j] - cell[j + 1]) > 3
      ) {
        wrongList.push(cell);
        continue cellLoop;
      }
    }

    rightList.push(cell);

    right++;
  }

  return right;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const input = req.body.input;
  let result;

  const ellapsed = measure(() => {
    result = solution(input);
  });

  res.status(200).json({
    result,
    ellapsed,
  });
}
