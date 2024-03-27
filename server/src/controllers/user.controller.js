
const register = async(req, res) => {
  console.log('registering user');
}
const login = (req,res)=>{
    //code to authenticate the user and return a token if successful
}

const logout = (req,res)=> {
   // code to remove the users auth token from the server
}

const getProfile = (req,res)=>{
    //get profile info for logged in user
}

export {
    register,
    login,
    logout,
    getProfile
}