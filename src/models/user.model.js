import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';
import {
  ACCESS_TOKEN_EXPIRES,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_EXPIRES,
  REFRESH_TOKEN_KEY,
  VERIFICATION_TOKEN_EXPIRES,
  VERIFICATION_TOKEN_KEY,
} from '../constants.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      default: null,
    },
    avatar: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordOTP: {
      type: Number,
    },
    forgotPasswordExpire: {
      type: Date,
    },
    userStatus: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    accountType: {
      type: String,
      enum: ['email', 'google'],
      default: 'email',
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id, email: this.email }, ACCESS_TOKEN_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id, email: this.email }, REFRESH_TOKEN_KEY, {
    expiresIn: REFRESH_TOKEN_EXPIRES,
  });
};

userSchema.methods.generateVerificationToken = function () {
  return jwt.sign({ _id: this._id, email: this.email }, VERIFICATION_TOKEN_KEY, {
    expiresIn: VERIFICATION_TOKEN_EXPIRES,
  });
};

export const User = mongoose.models.User || mongoose.model('User', userSchema);
