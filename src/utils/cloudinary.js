import { v2 as cloudinary } from 'cloudinary';
import { unlinkSync } from 'fs';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../constants.js';
import ApiError from './apiError.js';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (path, options) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(path, { ...options });
    return uploadResult;
  } catch (error) {
    throw ApiError.serverError(error.message);
  } finally {
    unlinkSync(path);
  }
};
export { cloudinaryUpload };
