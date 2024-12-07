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
