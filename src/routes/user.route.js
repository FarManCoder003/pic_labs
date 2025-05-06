import e from 'express';
import {
  deleteSelf,
  getSelf,
  signin,
  signout,
  signup,
  verifyEmail,
} from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { validator } from '../middlewares/validator.middleware.js';
import { signinValidationSchema, signupValidationSchema } from '../validators/user.validator.js';
const router = e.Router();
router.post('/users/signup', validator(signupValidationSchema), signup);
router.post('/users/signin', validator(signinValidationSchema), signin);
router.post('/users/signout', authMiddleware, signout);
router.get('/users/verify', verifyEmail);
router.get('/users/self', authMiddleware, getSelf);
router.get('/users/delete-self', authMiddleware, deleteSelf);
export default router;
