import e from 'express';
import {
  changePassword,
  deleteSelf,
  forgetPassword,
  getSelf,
  googleCallback,
  googleSignin,
  resetPassword,
  signin,
  signout,
  signup,
  updateSelf,
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
  updateSelfValidationSchema,
  verifyOtpValidationSchema,
} from '../validators/user.validator.js';
const router = e.Router();
router.post('/signup', validator(signupValidationSchema), signup);
router.post('/signin', validator(signinValidationSchema), signin);
router.get('/google/signin', googleSignin);
router.get('/google/callback', googleCallback);
router.post('/signout', authMiddleware, signout);
router.get('/verify', verifyEmail);
router.get('/self', authMiddleware, getSelf);
router.post('/update-self', validator(updateSelfValidationSchema), updateSelf);
router.get('/delete-self', authMiddleware, deleteSelf);
router.post('/forget-password', validator(forgetPasswordValidationSchema), forgetPassword);
router.post('/reset-password', validator(resetPasswordValidationSchema), resetPassword);
router.post('/verify-otp', validator(verifyOtpValidationSchema), verifyOtp);
router.post('/change-password', authMiddleware, changePassword);
export default router;
