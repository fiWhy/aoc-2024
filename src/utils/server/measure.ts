export const measure = (fnc: () => void) => {
  const start = performance.now();
  fnc();
  return start - performance.now();
};
