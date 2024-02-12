import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      // Add email validation if needed
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
