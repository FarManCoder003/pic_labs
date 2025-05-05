import { User } from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import ApiSuccess from '../utils/apiSuccess.js';
import asyncHandler from '../utils/asyncHandler.js';

const signup = asyncHandler(async (req, res, next) => {
  const usernameExists = await User.exists({ username: req.body.username });
  if (usernameExists) return next(ApiError.badRequest('Username already exists'));
  const emailExists = await User.exists({ email: req.body.email });
  if (emailExists) return next(ApiError.badRequest('Email already exists'));
  const user = await User.create(req.body);
  res.status(201).json(ApiSuccess.success('User created successfully', user));
});

export { signup };
