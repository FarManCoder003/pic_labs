import e from 'express';
import {
  deleteSelf,
  forgetPassword,
  getSelf,
  resetPassword,
  signin,
  signout,
  signup,
  verifyEmail,
  verifyOtp,
} from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { validator } from '../middlewares/validator.middleware.js';
import {
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
  signinValidationSchema,
  signupValidationSchema,
  verifyOtpValidationSchema,
} from '../validators/user.validator.js';
const router = e.Router();
router.post('/users/signup', validator(signupValidationSchema), signup);
router.post('/users/signin', validator(signinValidationSchema), signin);
router.post('/users/signout', authMiddleware, signout);
router.get('/users/verify', verifyEmail);
router.get('/users/self', authMiddleware, getSelf);
router.get('/users/delete-self', authMiddleware, deleteSelf);
router.post('/users/forget-password', validator(forgetPasswordValidationSchema), forgetPassword);
router.post('/users/reset-password', validator(resetPasswordValidationSchema), resetPassword);
router.post('/users/verify-otp', validator(verifyOtpValidationSchema), verifyOtp);
export default router;
