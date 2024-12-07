export const buildMatrixPartFour = (input: string) => {
  const matrix = input.split('\n').map((row) => row.split(''));
  return matrix;
};
