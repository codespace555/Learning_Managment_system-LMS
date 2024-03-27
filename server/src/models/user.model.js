import mongoose, { Schema } from "mongoose";

const userModel = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your Full Name"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match:
        /^([\w-\s.])+@(([a-z]{2,3})|([\w-]+\ [[\w-]+)([\.|\/|_]\ [0-9a-zA-Z])*(\.[a-zA-Z]{2,}))$/,
      required: [true, "Please provide an Email"],
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
   
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  {
    timestamps: true, // Saves createdAt and updatedAt
  }
);

const User = mongoose.model("User", userModel);
module.exports = User;
