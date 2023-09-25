const express = require("express")
const {register,login,logout,getUser} = require("../../controllers/user/user.Controllers.js")

const router = express.Router()

router.post("/register" , register)
router.post("/login" , login)
router.get("/logout" , logout)
router.get("/me" , getUser)

module.exports = router