import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});
const PORT = process.env.PORT ?? 8000;
const WHITELIST_DOMAINS = process.env.WHITELIST_DOMAINS ?? 'http://localhost:8000';
const MONGODB_URI = process.env.MONGODB_URI;
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USERNAME = process.env.MAIL_USERNAME;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

export { MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_USERNAME, MONGODB_URI, PORT, WHITELIST_DOMAINS };
