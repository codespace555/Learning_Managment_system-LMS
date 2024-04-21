import { Router } from "express";
import {
  register,
  login,
  logout,
  getProfile,
  updateUserAvatar,
  resetPassword,
  forgotPassword,
  changePassword,
  refreshAccessToken
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([{ name: "avatar", maxCount: 1 }]),

  register
);
router.route("/login").post(login);
router.route("/logout").get(isLoggedIn, logout);
router.route("/profile").get(isLoggedIn, getProfile);
router
  .route("/update-avatar")
  .put(isLoggedIn, upload.single("avatar"), updateUserAvatar);

router.route("/reset").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/changepassword").post(isLoggedIn,changePassword);
router.route("/refresh-token").post(refreshAccessToken);



export default router;
