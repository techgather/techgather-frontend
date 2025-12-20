export const delayFn = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
