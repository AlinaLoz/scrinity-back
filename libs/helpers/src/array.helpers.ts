export const processByChain = (list: object[], cb: Function): object => {
  return list.reduce(async (promise, item) => {
    await promise;
    return cb(item);
  }, Promise.resolve());
};
