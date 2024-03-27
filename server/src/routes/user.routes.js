import { Router } from "express";
import { register,login,logout ,getProfile} from "../controllers/user.controller.js";


const router = Router()

router.route('/register').post(register)
router.route("/login").post(login);
router.route( "/logout" ).get( logout );
router.route("/profile").get(getProfile)


export default router