import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Course } from "../models/course.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOncloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

import fs, { unlinkSync } from "fs";

// createCourse....................................................................
const createCourse = asyncHandler(async (req, res) => {
  const { title, description, category, createdBy } = req.body;

  if (
    [title, description, category, createdBy].some(
      (field) => field?.trim() == ""
    )
  ) {
    throw new ApiError(400, "All Field Required");
  }
  const coursethumbnail = await req.files?.thumbnail[0].path;
  const thumbnail = await uploadOncloudinary(
    coursethumbnail,
    "LMS_coursethumbnail"
  );
  if (!thumbnail) {
    throw new ApiError(400, "Thumbnail file is required");
  }

  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
    thumbnail: {
      public_id: thumbnail.public_id,
      secure_url: thumbnail.url,
    },
  });

  if (!course) {
    throw new ApiError(500, "Course could not be created, please try again");
  }
  res
    .status(200)
    .json(new ApiResponse(200, course, "course create Sucessfully"));
});

const getAllCoruses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).select("-lectures");
  let course = [...courses];
  res.status(200).json(new ApiResponse(200, course, "All course get"));
});

const addlecturesonCourse = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  let lectureData = {};
  if (!title || !description) {
    throw new ApiError(400, "All Field Required");
  }
  const course = await Course.findById(id);
  if (!course) {
    throw new ApiError(400, "Course not found");
  }
  const thumbnailLocalPath = await req.files?.lecturesThumbnail[0].path;
  const VideolLocalPath = await req.files?.lecture.path;
  const lecture = await uploadOncloudinary(
    VideolLocalPath,
    "LMS_Lectures_Video"
  );

  if (!lecture) {
    throw new ApiError(400, " Failed to upload video");
  }


  const lecturesThumbnail = await uploadOncloudinary(
    thumbnailLocalPath,
    "LMS_Lectures_thumbnail"
  );

  if (!lecturesThumbnail) {
    throw new ApiError(400, " Failed to upload Lecture thumbnail");
  }

  course.lectures.push({
    title,
    description,
    lecture: lectureData,

    lecturesThumbnail: {
      public_id: lecture.public_id,
      secure_url: lecture.url,
    },
  });

  res.status(200).json(new ApiResponse(200, course, "All course get"));
});

export { createCourse, getAllCoruses, addlecturesonCourse };
