import asyncHandler from 'express-async-handler';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.models.js';


const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, error.message) //"something went wrong while generating access and refresh token"
    }
}

const registerUser = asyncHandler(async (req,res) => {
    console.log("Received Data:", req.body); 
    const {username, email, password, standard, board, gender} = req.body;

    if(
        [username, email, password, standard, board, gender].some((field) => field?.trim() === "" )
    ){
        throw new ApiError(400, "All fields are required" )
    }
        
    const userExists = await User.findOne({email});
    if(userExists){
        throw new ApiError(400, 'User Already Exists');
    }

    const user = await User.create({username, email, password, standard, board, gender})

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" // removing possword and refresh token from response...
    )
    if(!createdUser){
        throw new ApiError(500, "something went wrong while creating user")
    }

    return res
    .status(201)
    .json(new ApiResponse(201, createdUser, 'User Created Successfully'))
    
})

const loginUser = asyncHandler(async (req,res) => {
    const {username, password} = req.body;
    const user = await User.findOne({
        $or: [{username}, {password}]
    });
    //const user = await User.findOne({username})
    if(!user){
        throw new ApiError(401, 'invalid Credentials')
    }
    
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        throw new ApiError(401, 'invalid Password')
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
        new ApiResponse(200, 
            {
              user: loggedInUser, accessToken, refreshToken
            }, 
            "User logged in successfully"
        )
    )
})

const getUserProfile = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if(!user) throw new ApiError(404, "user not found");

    res.status(200).json(new ApiResponse(200, user, "user profile fetched successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) =>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401, "unauthorized request")
    }
    try {
        const decodedToken = JsonWebTokenError.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(404, "invalid refresh Token")
        }
        if(incomingRefreshToken !== user?.refreshToken){
           throw new ApiError(401, "refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access Token refreshed successfully"
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message ||"Invalid Refresh Token")
    }
})

const logoutUser = asyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"))
})

export {
    registerUser,
    loginUser,
    getUserProfile,
    refreshAccessToken,
    logoutUser
}