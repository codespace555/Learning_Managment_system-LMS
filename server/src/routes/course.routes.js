import { Router } from "express";
import { authorizeRoles, isLoggedIn } from "../middlewares/auth.middlewares.js";
import { createCourse } from "../controllers/course.controllers.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/create-course",
  isLoggedIn,
  authorizeRoles("ADMIN"),
  upload.fields([{ name: "thumbnail", maxCount: 1 }]),

  createCourse
);

export default router;
