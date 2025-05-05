import jwt from 'jsonwebtoken';
import { APP_URL, VERIFICATION_TOKEN_KEY } from '../constants.js';
import { User } from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import ApiSuccess from '../utils/apiSuccess.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendMail, verificationMail } from '../utils/mail.js';

const signup = asyncHandler(async (req, res, next) => {
  const usernameExists = await User.exists({ username: req.body.username });
  if (usernameExists) return next(ApiError.badRequest('Username already exists'));

  const emailExists = await User.exists({ email: req.body.email });
  if (emailExists) return next(ApiError.badRequest('Email already exists'));

  const user = await User.create(req.body);
  const verifyurl = `${APP_URL}/api/v1/users/verify/?token=${user.generateVerificationToken()}`;
  sendMail({
    email: user.email,
    subject: 'Email Verification',
    mailTemplate: verificationMail(user.username, verifyurl),
  });
  res.status(201).json(ApiSuccess.success('User created successfully', user));
});

const verifyEmail = asyncHandler(async (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return next(ApiError.badRequest('Invalid token'));
  }
  const decodedToken = jwt.verify(token, VERIFICATION_TOKEN_KEY);
  if (!decodedToken) {
    return next(ApiError.badRequest('Invalid token'));
  }
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return next(ApiError.notFound('User not found'));
  }
  if (user.emailVerified) {
    return next(ApiError.badRequest('User already verified'));
  }
  user.emailVerified = true;
  await user.save();
  res.status(200).json(ApiSuccess.success('User verified successfully', user));
});

export { signup, verifyEmail };

