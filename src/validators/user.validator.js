import { z } from 'zod';
const signupValidationSchema = z.object({
  username: z.string().min(5).max(20),
  name: z.string().min(5).max(20),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
});

export { signupValidationSchema };
