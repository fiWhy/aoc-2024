import { measure } from '@/utils/server/measure';
import type { NextApiRequest, NextApiResponse } from 'next';

const commands = {
  no: "don't()",
  do: 'do()',
};

const list = Object.values(commands);

const solution = (input: string) => {
  const reg = /(don\'t\(\)|mul\((\d+),(\d+)\)|do\(\))/gi;
  let sum = 0;
  const stack: string[] = [];
  let res;
  while ((res = reg.exec(input))) {
    const match = res[0];
    if (list.includes(match)) {
      stack.push(match);
    } else {
      const lastInStack = stack[stack.length - 1];
      if (lastInStack === commands.do || !lastInStack) {
        stack.length = 0;
        sum += (res[2] as unknown as number) * (res[3] as unknown as number);
      }
    }
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
