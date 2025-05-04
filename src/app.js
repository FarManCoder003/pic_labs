import cookieParser from 'cookie-parser';
import cors from 'cors';
import e from 'express';
import { WHITELIST_DOMAINS } from './constants.js';
const app = e();
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(e.static('public'));
app.use(
  cors({
    origin: WHITELIST_DOMAINS,
    credentials: true,
  })
);
app.use(cookieParser());
export { app };
