import { Role } from '../models/role.model.js';
import ApiSuccess from '../utils/apiSuccess.js';
import asyncHandler from '../utils/asyncHandler.js';

const createRole = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const role = await Role.create({ name });
  return res.status(200).json(ApiSuccess.success('Role created successfully', role));
});
