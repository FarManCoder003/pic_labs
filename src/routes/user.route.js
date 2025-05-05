import e from 'express';
import { signup, verifyEmail } from '../controllers/user.controller.js';
import { validator } from '../middlewares/validator.middleware.js';
import { signupValidationSchema } from '../validators/user.validator.js';
const router = e.Router();
router.post('/users/signup', validator(signupValidationSchema), signup);
router.get('/users/verify', verifyEmail);
export default router;
