import { measure } from '@/utils/server/measure';
import { parseDayFive } from '@/utils/server/parse';
import type { NextApiRequest, NextApiResponse } from 'next';

const solution = (input: string) => {
  const [firstSection, secondSection] = parseDayFive(input);
  const correctRows = [];

  rowLoop: for (let i = 0; i < secondSection.length; i++) {
    for (let j = 0; j < secondSection[i].length; j++) {
      const [from, to] = [secondSection[i][j], secondSection[i][j + 1]];

      if (!to) {
        correctRows.push(i);
        continue rowLoop;
      }

      for (let k = 0; k < firstSection.length; k++) {
        const nextFirstSectionRow = firstSection[k];
        if (
          nextFirstSectionRow.to === from &&
          nextFirstSectionRow.from === to
        ) {
          continue rowLoop;
        }
      }
    }

    correctRows.push(i);
  }

  return correctRows.reduce((acc, next) => {
    const row = secondSection[next];
    const median = row[Math.floor(row.length / 2)];

    return acc + median;
  }, 0);
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
