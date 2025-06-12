import { z } from 'zod';
import { commonPasswords } from '../constants.js';

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
    )
    .refine((password) => !commonPasswords.includes(password), {
      message: 'Password is too common. Try something else.',
    }),
});

const signinValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const forgetPasswordValidationSchema = z.object({
  email: z.string().email(),
});

const verifyOtpValidationSchema = z.object({
  otp: z.number().min(6),
});

const resetPasswordValidationSchema = z.object({
  otp: z.number().min(6),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
    )
    .refine((password) => !commonPasswords.includes(password), {
      message: 'Password is too common. Try something else.',
    }),
});

const updateSelfValidationSchema = z.object({
  name: z.string().min(5).max(20),
  username: z.string().min(5).max(20),
  email: z.string().email(),
});

const passwordChangeSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z
      .string()
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .refine((password) => !commonPasswords.includes(password), {
        message: 'Password is too common. Try something else.',
      }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'New password should be different from old password',
    path: ['newPassword'],
  });

export {
  forgetPasswordValidationSchema,
  passwordChangeSchema,
  resetPasswordValidationSchema,
  signinValidationSchema,
  signupValidationSchema,
  updateSelfValidationSchema,
  verifyOtpValidationSchema,
};
