import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"

export const isLoggedIn = asyncHandler(async (req, res, next) => {
 try {
     const token =
       req.cookies?.accessToken ||
       req.header("Authorization")?.replace("Bearer ", "");
   
     if (!token) {
      throw res.status(400).json(new ApiError(401,null, "Unauthorized request"));

       
     }
     const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET);
   
     const user = await User.findById(decodedToken?._id).select(
       "-password -refreshToken"
     );
     if (!user) {
       
       throw res.status(400).json(new ApiError(401,null, "User Not Exist"));
       
     }
     req.user = user;
     next()
 } catch (error) {
     throw res.status(400).json(new ApiError(401,null, error?.message || "Invalid access token"));
 }
});

export const authorizeRoles = (...roles) =>
asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      
      throw res.status(400).json(new ApiError(403,null, "You do not have permission to view this route"));
    }

    next();
  });


  export const authorizeSubscribers = asyncHandler(async (req, res, next) => {
    if (req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
      throw res.status(400).json(new ApiError(403,null, "Please subscribe to access this route."));
    }
  
    next();
  });