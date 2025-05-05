import mongoose, { Schema } from 'mongoose';

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
  },
  { timestamps: true }
);
export const User = mongoose.models.User || mongoose.model('User', userSchema);
