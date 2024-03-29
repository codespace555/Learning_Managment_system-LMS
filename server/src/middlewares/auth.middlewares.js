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
       throw new ApiError(401, "Unauthorized request");
     }
     const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET);
   
     const user = await User.findById(decodedToken?._id).select(
       "-password -refreshToken"
     );
     if (!user) {
       throw new ApiError(401, "Invalid Access Token");
     }
     req.user = user;
     next()
 } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
 }
});

export const authorizeRoles = (...roles) =>
asyncHandler(async (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      
      throw new ApiError( 403,"You do not have permission to view this route",)
     
    }

    next();
  });


  export const authorizeSubscribers = asyncHandler(async (req, _res, next) => {
    if (req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
      throw new ApiError(403,"Please subscribe to access this route." );
    }
  
    next();
  });