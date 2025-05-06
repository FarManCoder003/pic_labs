import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_KEY } from '../constants.js';
import { User } from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    throw ApiError.unauthorized('You are not authenticated');
  }
  const decodedToken = jwt.verify(token, ACCESS_TOKEN_KEY);
  if (!decodedToken) {
    throw ApiError.unauthorized('You are not authenticated');
  }
  const user = await User.findById(decodedToken._id).select('-password -__v -createdAt -updatedAt');
  if (!user) {
    throw ApiError.unauthorized('You are not authenticated');
  }
  req.user = user;
  next();
});

export default authMiddleware;
