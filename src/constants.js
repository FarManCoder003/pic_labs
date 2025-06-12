import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

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
const allowedExtensions = ['jpg', 'jpeg', 'png'];

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export {
  ACCESS_TOKEN_EXPIRES,
  ACCESS_TOKEN_KEY,
  allowedExtensions,
  APP_URL,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  GOOGLE_ACCESS_TOKEN_URL,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_OAUTH_SCOPES,
  GOOGLE_OAUTH_URL,
  GOOGLE_TOKEN_INFO_URL,
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_USERNAME,
  MONGODB_URI,
  NODE_ENV,
  PORT,
  REFRESH_TOKEN_EXPIRES,
  REFRESH_TOKEN_KEY,
  VERIFICATION_TOKEN_EXPIRES,
  VERIFICATION_TOKEN_KEY,
  WHITELIST_DOMAINS,
};
