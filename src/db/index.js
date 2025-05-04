import mongoose from 'mongoose';
import { MONGODB_URI } from '../constants.js';
import ApiError from '../utils/apiError.js';

const MAX_RETRIES = 3;
let RETRY_DELAY = 5000;
export const dbConnect = async (attempt = 1) => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected');
  } catch (error) {
    if (attempt <= MAX_RETRIES) {
      RETRY_DELAY = RETRY_DELAY * 2 ** (attempt - 1);
      console.log('Database connection failed, retrying in', RETRY_DELAY / 1000, 'seconds');
      setTimeout(() => dbConnect(attempt + 1), RETRY_DELAY);
    } else {
      throw ApiError.customError(500, error.message);
    }
  }
};
