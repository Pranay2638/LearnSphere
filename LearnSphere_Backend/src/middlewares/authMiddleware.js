// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//     const token = req.header("Authorization");

//     if(!token){
//         return res.status(401).json({message: "Access Denied. No token provided."});
//     }

//     try {
//         const verified = jwt.verify(token.replace("Bearer ",""),process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(401).json({message: "Invalid Token"});
//     }
// }

// export default authMiddleware;
import { ApiError } from "../utils/ApiError.js";
//import { asyncHandler } from "../utils/asyncHandler.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js";

 const authMiddleware = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    
})

export default authMiddleware;