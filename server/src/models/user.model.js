import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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

// Encrypting the Password using Bcrypt
userModel.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    user.password = await bcrypt.hash(user.password, 10);

    next();
  } catch (error) {
    console.log("Error in User Model", error);
    next(error);
  }

  next();
});

userModel.methods.isPasswordCorret = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userModel.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
      role: this.role,
      subscription: this.subscription,
    },
    process.env.ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_EXPIRY,
    }
  );
};

userModel.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userModel);
