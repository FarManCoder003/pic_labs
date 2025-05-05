import e from 'express';
import { signup } from '../controllers/user.controller.js';
import { validator } from '../middlewares/validator.middleware.js';
import { signupValidationSchema } from '../validators/user.validator.js';
const router = e.Router();
router.post('/users/signup', validator(signupValidationSchema), signup);
export default router;
