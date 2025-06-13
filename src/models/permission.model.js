import mongoose, { Schema } from 'mongoose';

const permissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Permission =
  mongoose.models.Permission || mongoose.model('Permission', permissionSchema);
