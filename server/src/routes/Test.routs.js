import { Router } from "express";
import { getLeaderboard, getTestofUser,createTest } from "../controllers/typingtest.controller.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";


 const router = Router();

router.route("/getLeaderboard").get(getLeaderboard);
router.route("/createTest").post(isLoggedIn,createTest);
router.route("/getTestofUser").get(isLoggedIn,getTestofUser);

export default router;