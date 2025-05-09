import { z } from 'zod';

const commonPasswords = [
  'password',
  '123456',
  '12345678',
  'qwerty',
  'abc123',
  '111111',
  '123456789',
  'letmein',
  'trustno1',
  '000000',
  'iloveyou',
  'monkey',
  'dragon',
  'baseball',
  'football',
  'superman',
  'batman',
  'hello',
  'world',
  'welcome',
  'admin',
  'password123',
  'qwerty123',
  'abc123456',
  '123qwe',
  '1q2w3e4r',
  '1234567',
  'sunshine',
  'maggie',
  'pussy',
  'princess',
  'rockyou',
  'buster',
  'sophie',
  'brandy',
  'clover',
  'daniel',
  'cookie',
  'pepper',
  'honey',
  'butter',
  'sugar',
  'molly',
  'tigger',
  'poohbear',
  'bigbear',
  'teddybear',
  'fuzzybear',
  'fuzzy',
  'bear123',
  'bear',
  'panda',
  'pandabear',
  'panda123',
  'pandas',
  'pandamonium',
  'pandamon',
  'panda1234',
  'panda12345',
  'pandapanda',
  'pandapandamonium',
  'pandapandamon',
  'pandapanda123',
  'pandapanda1234',
  'pandapanda12345',
  'pandapandapanda',
  'pandapandapandamonium',
  'pandapandapandamon',
  'pandapandapanda123',
  'pandapandapanda1234',
  'pandapandapanda12345',
];

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
  resetPasswordValidationSchema,
  signinValidationSchema,
  signupValidationSchema,
  updateSelfValidationSchema,
  verifyOtpValidationSchema,
  passwordChangeSchema,
};
