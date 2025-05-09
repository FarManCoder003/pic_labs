import { z } from 'zod';
const signupValidationSchema = z.object({
  username: z.string().min(5).max(20),
  name: z.string().min(5).max(20),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
    ),
});

const signinValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const forgetPasswordValidationSchema = z.object({
  email: z.string().email(),
});

const verifyOtpValidationSchema = z.object({
  otp: z.number().length(6),
});

const resetPasswordValidationSchema = z.object({
  otp: z.number().length(6),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
    ),
});

export {
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
  signinValidationSchema,
  signupValidationSchema,
  verifyOtpValidationSchema,
};
