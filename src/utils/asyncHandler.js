const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(res, req, next)).catch((err) => next(err));

export default asyncHandler;
