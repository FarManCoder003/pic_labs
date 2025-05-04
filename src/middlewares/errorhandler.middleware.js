import ApiError from '../utils/apiError.js';

const errorHandler = (err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .json(ApiError.customError(err.statusCode, err.message, err.errors));
};
export default errorHandler;
