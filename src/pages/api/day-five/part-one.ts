import { measure } from '@/utils/server/measure';
import type { NextApiRequest, NextApiResponse } from 'next';

const solution = (input: string) => {
  return input;
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
