import multer from 'multer';
import path from 'path';
import { allowedExtensions } from '../constants.js';

const fileFilter = (req, file, cb) => {
  if (allowedExtensions.includes(file.originalname)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only jpg, jpeg, and png files are allowed.'), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/temp');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileUpload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter });
export default fileUpload;
