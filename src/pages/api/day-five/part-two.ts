import { measure } from '@/utils/server/measure';
import { parseDayFive } from '@/utils/server/parse';
import type { NextApiRequest, NextApiResponse } from 'next';

type FirstSectionElement = {
  from: number;
  to: number;
};

const swap = (row: number[], firstSection: FirstSectionElement[]) => {
  let checked = false;
  let isCorrect = true;
  let initiallyCorrect = false;
  while (!initiallyCorrect) {
    swapLoop: for (let j = 0; j < row.length; j++) {
      const [from, to] = [row[j], row[j + 1]];

      if (!to) {
        initiallyCorrect = true;
        break;
      }

      for (let k = 0; k < firstSection.length; k++) {
        const nextFirstSectionRow = firstSection[k];
        if (
          nextFirstSectionRow.to === from &&
          nextFirstSectionRow.from === to
        ) {
          if (!checked) {
            checked = true;
            isCorrect = false;
          }
          row[j] = to;
          row[j + 1] = from;
          break swapLoop;
        }
      }
    }
  }

  return isCorrect;
};

const solution = (input: string) => {
  const [firstSection, secondSection] = parseDayFive(input);
  const correctRows = new Set<number>();
  const wrongRows = new Set<number>();

  for (let i = 0; i < secondSection.length; i++) {
    const isCorrect = swap(secondSection[i], firstSection);

    if (isCorrect) {
      correctRows.add(i);
    } else {
      wrongRows.add(i);
    }
  }

  return Array.from(wrongRows).reduce((acc, next) => {
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
