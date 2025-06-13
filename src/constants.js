import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
dotenv.config({
  path: './.env',
});

const commonPasswords = [
  'password',
  '123456',
  '12345678',
  'qwerty',
  'abc123',
  '111111',
  '123456789',
  'letmein',
  'trustno1',
  '000000',
  'iloveyou',
  'monkey',
  'dragon',
  'baseball',
  'football',
  'superman',
  'batman',
  'hello',
  'world',
  'welcome',
  'admin',
  'password123',
  'qwerty123',
  'abc123456',
  '123qwe',
  '1q2w3e4r',
  '1234567',
  'sunshine',
  'maggie',
  'pussy',
  'princess',
  'rockyou',
  'buster',
  'sophie',
  'brandy',
  'clover',
  'daniel',
  'cookie',
  'pepper',
  'honey',
  'butter',
  'sugar',
  'molly',
  'tigger',
  'poohbear',
  'bigbear',
  'teddybear',
  'fuzzybear',
  'fuzzy',
  'bear123',
  'bear',
  'panda',
  'pandabear',
  'panda123',
  'pandas',
  'pandamonium',
  'pandamon',
  'panda1234',
  'panda12345',
  'pandapanda',
  'pandapandamonium',
  'pandapandamon',
  'pandapanda123',
  'pandapanda1234',
  'pandapanda12345',
  'pandapandapanda',
  'pandapandapandamonium',
  'pandapandapandamon',
  'pandapandapanda123',
  'pandapandapanda1234',
  'pandapandapanda12345',
];
const adminDetails = {
  username: 'admin',
  name: 'admin',
  email: 'admin@admin.com',
  password: 'admin',
  emailVerified: true,
};
const NODE_ENV = process.env.NODE_ENV ?? 'development';
const PORT = process.env.PORT ?? 8000;
const APP_URL = NODE_ENV === 'production' ? process.env.APP_URL : `http://localhost:${PORT}`;
const WHITELIST_DOMAINS = process.env.WHITELIST_DOMAINS ?? 'http://localhost:8000';
const MONGODB_URI = process.env.MONGODB_URI;
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USERNAME = process.env.MAIL_USERNAME;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES;
const REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES;
const VERIFICATION_TOKEN_KEY = process.env.VERIFICATION_TOKEN_KEY;
const VERIFICATION_TOKEN_EXPIRES = process.env.VERIFICATION_TOKEN_EXPIRES;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;
const GOOGLE_TOKEN_INFO_URL = process.env.GOOGLE_TOKEN_INFO_URL;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const GOOGLE_OAUTH_SCOPES = [
  'https%3A//www.googleapis.com/auth/userinfo.email',
  'https%3A//www.googleapis.com/auth/userinfo.profile',
];
const allowedExtensions = ['.jpg', '.jpeg', '.png'];
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: (req) => (req.user ? 100 : 10),
  message: { error: 'Too many requests, please try again later' },
  legacyHeaders: false,
  standardHeaders: true,
  keyGenerator: (req) => req.ip,
  max: 5,
});
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 1,
  delayMs: () => 2000,
});
export {
  ACCESS_TOKEN_EXPIRES,
  ACCESS_TOKEN_KEY,
  adminDetails,
  allowedExtensions,
  APP_URL,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  commonPasswords,
  GOOGLE_ACCESS_TOKEN_URL,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_OAUTH_SCOPES,
  GOOGLE_OAUTH_URL,
  GOOGLE_TOKEN_INFO_URL,
  limiter,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USERNAME,
  MONGODB_URI,
  NODE_ENV,
  PORT,
  REFRESH_TOKEN_EXPIRES,
  REFRESH_TOKEN_KEY,
  speedLimiter,
  VERIFICATION_TOKEN_EXPIRES,
  VERIFICATION_TOKEN_KEY,
  WHITELIST_DOMAINS,
};
