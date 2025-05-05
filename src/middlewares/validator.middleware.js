import { ZodError } from 'zod';

export function validator(schema) {
  return (req, res, next) => {
    try {
      const schemaValidatorSchema = schema.parse(req.body);
      req.body = schemaValidatorSchema;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);
      }
    }
  };
}
