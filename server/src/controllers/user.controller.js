import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// register user
const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if ([fullName, email, password].some((field) => field?.trim() == "")) {
    throw new ApiError(400, "All Field Required");
  }
  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new ApiError(400, "User Already Exists");
  }

  const user = await User.create({ fullName, email, password,avatar:{
    public_id: email,
    secure_url: `https://api.adorable.io/avatars/285/${email}`
  } });

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken -forgotPasswordToken -forgotPasswordExpiry",
    
  );

  if (!createUser) {
    throw new ApiError(500, "Server Error: Unable to Create User");
  }
  res.status(200).json(new ApiResponse(200, user, "User create Sucessfully"));
});

const login = (req, res) => {};

const logout = (req, res) => {
  // code to remove the users auth token from the server
};

const getProfile = (req, res) => {
  //get profile info for logged in user
};

export { register, login, logout, getProfile };
