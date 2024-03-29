import { Router } from "express";
import { register,login,logout ,getProfile} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";


const router = Router()

router.route('/register').post(register)
router.route("/login").post(login);
router.route( "/logout" ).get( isLoggedIn,logout );
router.route("/profile").get(isLoggedIn,getProfile)


export default router