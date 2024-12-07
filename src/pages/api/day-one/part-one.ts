import { measure } from '@/utils/server/measure';
import { parseNumbersDayOne } from '@/utils/server/parse';
import type { NextApiRequest, NextApiResponse } from 'next';

const solution = (input: string) => {
  const [left, right] = parseNumbersDayOne(input);

  let sum = 0;

  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }

  return sum;
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
