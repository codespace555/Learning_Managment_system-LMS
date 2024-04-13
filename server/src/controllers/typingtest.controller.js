import { Test } from "../models/Typing.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTest = asyncHandler(async (req, res) => {
  const { userId, test_date, test_duration, acuracy, speed } = req.body;
  if (
    [userId, test_date, test_duration, acuracy, speed].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All Field Required");
  
  }

  const test = await Test.create({
    userId,
    test_date,
    test_duration,
    acuracy,
    speed,
  });

  if (!test) {
    throw new ApiError(
      400,
      "Something Worg During add Info about your typing test Try agin"
    );
  }
  res.status(200).json(new ApiResponse(200, Test, "Test add   Sucessfully"));
});

const getTestofUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const test = Test.find({ userId });

  if (!test) {
    throw new ApiError(400, "Not find Any Data");
  }
  res
    .status(200)
    .json(new ApiResponse(200, Test, "User Test Data Get Sucessfully"));
});

const getLeaderboard = asyncHandler(async (req, res) => {
  const leaderboard = await Test.aggregate([
    {
      $group: {
        _id: $userId,
        averageSpeed: { $avg: $speed },
      },
    },
    {
      $sort: {
        averageSpeed: -1,
      },
    },
    {
      $limit: 20,
    },
  ]);
  if (!leaderboard) {
    throw new ApiError(400, "Not find Any Data");
  }
  const getAllUser = await leaderboard.map(async (test) => {
    const user = await User.findById(entry._id);
    return { username: user.username, average_speed: entry.averageSpeed };
  });

  if (!getAllUser) {
    throw new ApiError(400, "Not find Any Data");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, getAllUser, "leaderboardTest Data Get Sucessfully")
    );
});

export { createTest, getLeaderboard, getTestofUser };
