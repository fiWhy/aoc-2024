import { measure } from '@/utils/server/measure';
import type { NextApiRequest, NextApiResponse } from 'next';

const solution = (input: string) => {
  const reg = /mul\((\d+),(\d+)\)/g;
  let sum = 0;
  let res;
  while ((res = reg.exec(input))) {
    sum += (res[1] as unknown as number) * (res[2] as unknown as number);
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
