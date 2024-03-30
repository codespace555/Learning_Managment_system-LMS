import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { fileDelete, uploadOncloudinary } from "../utils/cloudinary.js";

const options = {
  httpOnly: true,
  secure: true,
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(500, "something went wrong while genrating token");
  }
};

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

  const avatarLocalPath = await req.files?.avatar[0].path;
  const avatar = await uploadOncloudinary(avatarLocalPath);
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: avatar.public_id,
      secure_url: avatar.url,
    },
  });

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    throw new ApiError(500, "Server Error: Unable to Create User");
  }
  res.status(200).json(new ApiResponse(200, user, "User create Sucessfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new ApiError(400, "All Field Required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid Credentials");
  }
  const isPasswordValid = await user.isPasswordCorret(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "Logged In Successfully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const getProfile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "No image provided");
  }
  const user = req.user;

  if (!user) {
    throw new Error("User not found");
  }


  fileDelete(user.avatar.public_id); //delete old file from server folder

  const avatar = await uploadOncloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "No image path get");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: {
          public_id: avatar.public_id,
          secure_url: avatar.url,
        },
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Avatar image updated successfully"));
});

export { register, login, logout, getProfile, updateUserAvatar };
