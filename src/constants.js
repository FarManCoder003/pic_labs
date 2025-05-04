import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});
const PORT = process.env.PORT ?? 8000;
const WHITELIST_DOMAINS = process.env.WHITELIST_DOMAINS ?? 'http://localhost:8000';
const MONGODB_URI = process.env.MONGODB_URI;
export { MONGODB_URI, PORT, WHITELIST_DOMAINS };
