import { User } from '../models/user.model.js';
import ApiSuccess from '../utils/apiSuccess.js';
import asyncHandler from '../utils/asyncHandler.js';

const signup = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(ApiSuccess.success('User created successfully', user));
});

export { signup };
