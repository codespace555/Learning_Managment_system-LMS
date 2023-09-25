const getUser = require("./userGetuser.js");
const login = require("./userLogin.js");
const register = require("./userRegister.js")
const logout = require("./userLogout.js")

module.exports = {
    login,
    register,
    logout,
    getUser
}