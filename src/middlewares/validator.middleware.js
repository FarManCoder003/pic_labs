import { ZodError } from 'zod';
import ApiError from '../utils/apiError.js';

export function validator(schema) {
  return (req, res, next) => {
    try {
      const schemaValidatorSchema = schema.parse(req.body);
      req.body = schemaValidatorSchema;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formatZodError = {};
        error.errors.forEach((issue) => (formatZodError[issue.path[0]] = issue.message));
        next(ApiError.badRequest('Validation error', formatZodError));
      } else {
        next(error);
      }
    }
  };
}
