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

export {
  ACCESS_TOKEN_EXPIRES,
  ACCESS_TOKEN_KEY,
  APP_URL,
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
  WHITELIST_DOMAINS
};

