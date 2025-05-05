import { z } from 'zod';
const signupValidationSchema = z.object({
  username: z.string().min(5),
  name: z.string().min(5),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
});

export { signupValidationSchema };
