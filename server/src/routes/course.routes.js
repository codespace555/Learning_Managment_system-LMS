import { Router } from "express";
import { authorizeRoles, isLoggedIn } from "../middlewares/auth.middlewares.js";
import {
  addlecturesonCourse,
  createCourse,
  getAllCoruses,
} from "../controllers/course.controllers.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-course").post(
  isLoggedIn,
  authorizeRoles("ADMIN"),
  upload.fields([{ name: "thumbnail", maxCount: 1 }]),

  createCourse
);
router.route("/getallCourse").get(getAllCoruses);

router.route("/addlectures/:id").post(
  isLoggedIn,
  authorizeRoles("ADMIN"),

  upload.fields([
    { name: "lecture", maxCount: 1 },
    { name: "lecturesThumbnail", maxCount: 1 },
  ]),

  addlecturesonCourse
);
export default router;
