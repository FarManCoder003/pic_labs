import { z } from 'zod';

const createRoleValidationSchema = z.object({
  name: z.string(),
  description: z.string().isOptional(),
  permissions: z.array(z.string()),
});
export { createRoleValidationSchema };
