const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [30, "name must be less then 30 char"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: ["^[w-.]+@([w-]+.)+[w-]{2,4}$"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "Password must be at-least 8 char"],
      select: false,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

const userModel = model("User" ,userSchema)

module.exports = userModel