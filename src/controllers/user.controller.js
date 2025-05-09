import jwt from 'jsonwebtoken';
import { APP_URL, VERIFICATION_TOKEN_KEY } from '../constants.js';
import { User } from '../models/user.model.js';
import ApiError from '../utils/apiError.js';
import ApiSuccess from '../utils/apiSuccess.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendMail, verificationMail } from '../utils/mail.js';

const signup = asyncHandler(async (req, res) => {
  const usernameExists = await User.exists({ username: req.body.username });
  if (usernameExists) throw ApiError.badRequest('Username already exists');

  const emailExists = await User.exists({ email: req.body.email });
  if (emailExists) throw ApiError.badRequest('Email already exists');

  const createdUser = await User.create(req.body);
  const user = await User.findById(createdUser._id).select('-password -__v -createdAt -updatedAt');
  const verifyUrl = `${APP_URL}/api/v1/users/verify/?token=${user.generateVerificationToken()}`;
  sendMail({
    email: user.email,
    subject: 'Email Verification',
    mailTemplate: verificationMail(user.username, verifyUrl),
  });
  res.status(201).json(ApiSuccess.success('User created successfully', user));
});

const verifyEmail = asyncHandler(async (req, res) => {
  const token = req.query.token;
  if (!token) throw ApiError.badRequest('Invalid token');
  const decodedToken = jwt.verify(token, VERIFICATION_TOKEN_KEY);
  if (!decodedToken) throw ApiError.badRequest('Invalid token');
  const user = await User.findById(decodedToken._id);
  if (!user) throw ApiError.notFound('User not found');
  if (user.emailVerified) throw ApiError.badRequest('User already verified');
  user.emailVerified = true;
  await user.save();
  res.status(200).json(ApiSuccess.success('User verified successfully', user));
});

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw ApiError.badRequest('Invalid credentials');
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw ApiError.badRequest('Invalid credentials');
  if (user.emailVerified === false) {
    throw ApiError.badRequest('Email not verified');
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  const options = { httpOnly: true, secure: true, samesite: 'lax' };
  res
    .status(200)
    .cookie('accessToken', accessToken, { ...options, maxAge: 24 * 60 * 60 * 1000 })
    .cookie('refreshToken', refreshToken, { ...options, maxAge: 30 * 24 * 60 * 60 * 1000 })
    .json(ApiSuccess.success('User signed in successfully', { accessToken, refreshToken }));
});

const getSelf = asyncHandler(async (req, res) => {
  res.status(200).json(ApiSuccess.success('User fetched successfully', req.user));
});

const signout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json(ApiSuccess.success('User signed out successfully'));
});

const deleteSelf = asyncHandler(async (req, res) => {
  User.findByIdAndDelete(req.user._id);
  res.status(200).json(ApiSuccess.success('User deleted successfully'));
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw ApiError.badRequest('Invalid credentials');
  const otp = Math.floor(100000 + Math.random() * 900000);
  user.forgetPasswordOtp = otp;
  user.forgotPasswordExpire = Date.now() + 10 * 60 * 1000;
  await user.save();
  sendMail({
    email,
    subject: 'Password Reset',
    mailTemplate: resetPasswordMail(otp),
  });
  res.status(200).json(ApiSuccess.success('User signed in successfully'));
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const user = await User.findOne({
    forgetPasswordOtp: otp,
    forgotPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    user.forgetPasswordOtp = null;
    user.forgotPasswordExpire = null;
    await user.save();
    throw ApiError.badRequest('Invalid credentials');
  }
  return res.status(200).json(ApiSuccess.success('OTP verified successfully'));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { otp, password } = req.body;
  const user = await User.findOne({
    forgetPasswordOtp: otp,
  });
  user.password = password;
  user.forgetPasswordOtp = null;
  user.forgotPasswordExpire = null;
  await user.save();
  res.status(200).json(ApiSuccess.success('Password reset successfully'));
});

export {
  deleteSelf,
  forgetPassword,
  getSelf,
  resetPassword,
  signin,
  signout,
  signup,
  verifyEmail,
  verifyOtp,
};
