import asyncHandler from 'express-async-handler'
import { Video } from '../models/video.models.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const createVideo = asyncHandler(async(req,res) => {
    const {title, description} = req.body
    let videoURL = req.file ? req.file.path : null
    console.log("Request Body:", req.body)  // Log request body
    console.log("Uploaded File:", req.file) // Log uploaded file

    if(!title || !videoURL){
        throw new ApiError(400, "Title and videoURL are required! ")
    }

     videoURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    try {
        const video = await Video.create({
            title,
            description,
            videoURL,
            uploadedBy: req.user._id,
        });
        res.
        status(201).
        json({
            success: true,
            message: "Video uploaded successfully",
            data: video
        })
    } catch (error) {
        console.log("Video upload Unsuccessfull!", error)
        ApiResponse(500,"Internal Server Error", error)
    }

});

const getVideo = asyncHandler(async(req,res) => {
    try {
        const video = await Video.find({}).populate("uploadedBy", "username")
        return res.status(201).json(video)
    } catch (error) {
        throw new ApiError(500, error.message)
    }
});

const getUserVideo = asyncHandler(async(req,res) => {
     try {
        const userId = req.user.id;
        const userVideos = await Video.find({uploadedBy : userId});
        return res.
        status(201)
        .json(
            {
                success: true,
                message: "user's videos fetched successfully",
                data: userVideos
            }
        )
     } catch (error) {
        return res.
        status(500)
        .json({
            success: false,
            message: "Error in fetching user's videos!",
            error: error.message
        })
     }
})

const deleteVideo = asyncHandler(async(req,res) => {
    const {id} = req.params;
    console.log("video if from request: ", req.params)
    
    try {
        const video = await Video.findById(id)
        console.log(video)
        
        if(!video){
            throw new ApiError(401, "video not found!")
        }
        console.log("Video uploader ID:", video.uploadedBy);
        if(video.uploadedBy.toString() !== req.user._id.toString()){
            throw new ApiError(401, "Not Authorized!")
        }
        await Video.findByIdAndDelete(id)
        return res.status(201).json(new ApiResponse(200, "video deleted successfully..."))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

export {
    createVideo,
    getVideo,
    getUserVideo,
    deleteVideo
}