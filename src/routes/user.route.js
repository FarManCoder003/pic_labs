import e from 'express';
import { signin, signup, verifyEmail } from '../controllers/user.controller.js';
import { validator } from '../middlewares/validator.middleware.js';
import { signinValidationSchema, signupValidationSchema } from '../validators/user.validator.js';
const router = e.Router();
router.post('/users/signup', validator(signupValidationSchema), signup);
router.post('/users/signin', validator(signinValidationSchema), signin);
router.get('/users/verify', verifyEmail);
export default router;
