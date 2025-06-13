import e from 'express';
import { createRole } from '../controllers/role.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import checkPermission from '../middlewares/checkPermission.middleware.js';
import { validator } from '../middlewares/validator.middleware.js';
import { createRoleValidationSchema } from '../validators/role.validator.js';

const router = e.Router();
router
  .route('/roles')
  .post(
    authMiddleware,
    checkPermission(['admin']),
    validator(createRoleValidationSchema),
    createRole
  );

export default router;
