import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Course } from "../models/course.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { fileDelete, uploadOncloudinary } from "../utils/cloudinary.js";
import { uploadVideo } from "../utils/uploadVideo.js";

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

const SearchCourse = asyncHandler(async (req, res) => {
  let searchKeyword = req.query.search;
  console.log("Search Keyword : ", searchKeyword);
  // Checking the keyword is empty or not
  if (
    !searchKeyword ||
    typeof searchKeyword !== "string" ||
    searchKeyword.trim() === ""
  ) {
    throw new ApiError(400, "Please provide a valid non-empty search keyword.");
  }

  const courses = await Course.find({
    $text: { $search: searchKeyword },
  }).exec();
  res.status(200).json(new ApiResponse(200, courses, "Successfully searched"));
});

const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, category, createdBy } = req.body;

  if (
    [title, description, category, createdBy].some(
      (field) => field?.trim() == ""
    )
  ) {
    throw new ApiError(400, "All Field Required");
  }

  const thumbnailLocalPath = req.files?.thumbnail[0].path;

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "thumbnail Field is Required");
  }

  const course = await Course.findById(id);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }
  const oldThumbnail = course.thumbnail;

  if (!oldThumbnail) {
    throw new ApiError(400, "oldThumbnailis not found");
  }

  await fileDelete(oldThumbnail.public_id);
  const updateThumbnail = await uploadOncloudinary(
    thumbnailLocalPath,
    "LMS_coursethumbnail"
  );

  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        title,
        description,
        category,
        createdBy,
        thumbnail: {
          public_id: updateThumbnail.public_id,
          secure_url: updateThumbnail.url,
        },
        updatedAt: Date.now(),
      },
    },
    { new: true, runValidators: true }
  );

  if (!updatedCourse) {
    throw new ApiError(404, "No such course found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedCourse, "update  course sucessfully"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Invalid request , provide an id");
  }
  let course = await Course.findByIdAndDelete(id);
  console.log(course);
  if (!course) {
    throw new ApiError(404, "Course not found!");
  }
  const oldThumbnail = course.thumbnail;

  if (!oldThumbnail) {
    throw new ApiError(400, "oldThumbnailis not found");
  }

  await fileDelete(oldThumbnail.public_id);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Deleted the course successfully!"));
});

const addlecturesonCourse = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  if (!title || !description) {
    throw new ApiError(400, "All Field Required");
  }
  const course = await Course.findById(id);
  if (!course) {
    throw new ApiError(400, "Course not found");
  }
  const thumbnailLocalPath = await req.files?.lecturesThumbnail[0].path;
  const VideolLocalPath = await req.files?.lecture[0].path;
  const lecture = await uploadVideo(VideolLocalPath, "LMS_Lectures_Video");

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
    lecture: {
      public_id: lecture.public_id,
      secure_url: lecture.url,
    },

    lecturesThumbnail: {
      public_id: lecturesThumbnail.public_id,
      secure_url: lecturesThumbnail.url,
    },
  });

  if (!course.lectures) {
    throw new ApiError(400, " Failed to upload Lecture ");
  }

  await course.save();

  res.status(200).json(new ApiResponse(200, course, "All course get"));
});

const updatelecturesonCourse = asyncHandler(async (req, res) => {
  const { courseId, lectureId } = req.params;
  console.log(lectureId, courseId);
  if (!courseId) {
    throw new ApiError(400, "courseId Field Required");
  }
  if (!lectureId) {
    throw new ApiError(400, "lectureId Field Required");
  }
  const { title, description } = req.body;
  if (!title || !description) {
    throw new ApiError(400, "All Field Required");
  }
  const course = await Course.findById(courseId);

  if (!course) {
    throw new ApiError(400, "Course not found");
  }

  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture._id.toString() === lectureId.toString()
  );
  if (lectureIndex === -1) {
    throw new ApiError(400, "lecture not found");
  }

  const thumbnailLocalPath = await req.files?.lecturesThumbnail[0].path;
  const VideolLocalPath = await req.files?.lecture[0].path;
  await fileDelete(course.lectures[lectureIndex].lecture.public_id);
  await fileDelete(course.lectures[lectureIndex].lecturesThumbnail.public_id);

  const uploadedVideo = await uploadVideo(
    VideolLocalPath,
    "LMS_Lectures_Video"
  );

  const lecturesThumbnail = await uploadOncloudinary(
    thumbnailLocalPath,
    "LMS_Lectures_thumbnail"
  );

  if (!uploadedVideo) {
    throw new ApiError(400, " Failed to upload video");
  }

  if (!lecturesThumbnail) {
    throw new ApiError(400, " Failed to upload Lecture thumbnail");
  }

  course.lectures[lectureIndex].title = title;
  course.lectures[lectureIndex].description = description;
  course.lectures[lectureIndex].lecture = {
    public_id: uploadedVideo.public_id,
    secure_url: uploadedVideo.url,
  };
  course.lectures[lectureIndex].lecturesThumbnail = {
    public_id: lecturesThumbnail.public_id,
    secure_url: lecturesThumbnail.url,
  };

  // Save updated course
  await course.save();

  res
    .status(200)
    .json(new ApiResponse(200, course, " course update successfully"));
});

export {
  createCourse,
  getAllCoruses,
  addlecturesonCourse,
  SearchCourse,
  updateCourse,
  deleteCourse,
  updatelecturesonCourse,
};
