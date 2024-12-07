export const parseNumbersDayOne = (input: string) => {
  const left: number[] = [];
  const right: number[] = [];

  input.split('\n').forEach((row) => {
    const splitted = row.trim().split('   ');
    left.push(Number(splitted[0]));
    right.push(Number(splitted[1]));
  });

  left.sort();
  right.sort();

  return [left, right];
};

export const parseDayTwo = (input: string) => {
  const rows = input.split('\n');

  return rows.map((r) => r.split(' ').map(Number));
};

export const parseDayFive = (input: string) => {
  const parsed = input.split('\n');
  const emptyIndex = parsed.findIndex((v) => v === '');
  return [
    parsed.slice(0, emptyIndex).map((v) => {
      const splitted = v.split('|');
      return {
        from: Number(splitted[0]),
        to: Number(splitted[1]),
      };
    }),
    parsed.slice(emptyIndex + 1).map((row) => row.split(',').map(Number)),
  ] as const;
};
