import mongoose, { Schema } from "mongoose";

const roleSchema = new Schema({
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
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Permission',
    }
  ]
}, {
  timestamps: true,
});

export const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);