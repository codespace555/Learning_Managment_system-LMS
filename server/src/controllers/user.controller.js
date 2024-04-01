import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { fileDelete, uploadOncloudinary } from "../utils/cloudinary.js";
import sendEmail from "../utils/sendEmail.js";
import Cryptr from "cryptr";
import bcrypt from "bcryptjs";

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

//register..........................................................................

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
  const avatar = await uploadOncloudinary(avatarLocalPath,"LMS_avatar");
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
//login ..........................................................................

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
//logout..........................................................................

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

//updateUserAvatar..........................................................................
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "No image provided");
  }
  const user = req.user;

  if (!user) {
    throw new Error("User not found");
  }

  try {
    // If user has an existing avatar, delete it from Cloudinary
    if (user.avatar && user.avatar.public_id) {
      await fileDelete(user.avatar.public_id); 
    }

    // Upload new avatar to Cloudinary
    const avatar = await uploadOncloudinary(avatarLocalPath,"LMS_avatar");
    if (!avatar) {
      throw new ApiError(400, "Failed to upload avatar image");
    }

    // Update user document with new avatar details
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          "avatar.public_id": avatar.public_id,
          "avatar.secure_url": avatar.url,
        },
      },
      { new: true, select: "-password" }
    );

    // Send success response with updated user
    res.status(200).json({
      status: "success",
      data: updatedUser,
      message: "Avatar image updated successfully",
    });
  } catch (error) {
    // Handle any errors
    console.error("Error updating avatar:", error);
    throw new ApiError(500, "Internal server error");
  }
});

// forgotPassword......................................................................

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new ApiError(400, "Please provide an email address");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "Email does not exist");
    }
    const resetToken = await user.getResetPasswordToken();
    if (!resetToken) {
      throw new ApiError(400, "something wents wrong to gen reset Token");
    }

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const subject = "Reset Password";
    const message = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
      /* Global styles */
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        line-height: 1.6;
        color: #444;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #007bff;
        text-align: center;
      }
      p {
        margin-bottom: 20px;
      }
      a {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #000;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
    </head>
    <body>
    
    <div class="container">
      <h1>Password Reset</h1>
      <p>Dear User,</p>
      <p>You recently requested to reset your password. If you did not make this request, please ignore this email.</p>
      <p>To reset your password, please click the following button:</p>
      <p style="text-align: center;"><a href="${resetPasswordUrl}" target="_blank">Reset Your Password</a></p>
      <p>If you're unable to click the button above, please copy and paste the following URL into your browser:</p>
      <p style="text-align: center;">${resetPasswordUrl}</p>
      <p>Thank you,</p>
      <p>LearnifTeach</p>
    </div>
    
    </body>
    </html>`;

    console.log(resetPasswordUrl);

    sendEmail(email, subject, message);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          resetPasswordUrl,
          `Email has been sent to ${email} successfully`
        )
      );
  } catch (error) {
    console.log("error");
    throw new ApiError(500, error);
  }
});

// resetPassword......................................................................
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const cryptr = new Cryptr(process.env.REFRESH_TOKEN_SECRET);
  const decryptedString = cryptr.decrypt(resetToken);
  console.log(decryptedString);

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const user = await User.findOne({
    forgotPasswordToken: decryptedString,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(404, "Token is invalid or expired, please try again");
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        password: await bcrypt.hash(password, 10),
      },
      $unset: {
        forgotPasswordToken: 1,
        forgotPasswordExpiry: 1,
      },
    },
    { new: true, select: "-password" }
  );

  res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Successfully changed password"));
});

// changePassword......................................................................

const changePassword = asyncHandler(async (req, res) => {
  const { oldpassword, newpassword, confirmPassword } = req.body;

  if (!(oldpassword && newpassword && confirmPassword)) {
    throw new ApiError(400, "Please provide all fields");
  }
  // check old password
  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }
  const isPasswordValid = await user.isPasswordCorret(oldpassword);

  if (!isPasswordValid) {
    return next(new ApiError("Invalid old password", 400));
  }

  // Check if the passwords match
  if (newpassword !== confirmPassword) {
    throw new ApiError(400, "confirmPassword do not match");
  }
  // update password
  user.password = await bcrypt.hash(newpassword, 10);

  res.status(200).json((new ApiResponse(200, true,"Password has been successfully changed")));

})
// ......................................................................


export {
  register,
  login,
  logout,
  getProfile,
  updateUserAvatar,
  forgotPassword,
  resetPassword,
  changePassword
};
